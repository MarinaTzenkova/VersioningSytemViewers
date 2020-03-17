<template>
  <div></div>
</template>

<script>
import { select, axisBottom, scaleLinear, axisLeft, line, range } from "d3";
import { dataFormatters } from "@/shared/utils";
import { ref, reactive, computed } from "@vue/composition-api";

function closest(arr, goal) {
  return arr.reduce((prev, curr) =>
    Math.abs(+curr - goal) < Math.abs(+prev - goal) ? curr : prev
  );
}
export default {
  props: {
    scan: { type: String, required: true },
    scans: { type: Array, required: true },
    data: { type: Array, required: true },
    yLabel: { type: String, required: true },
    yLimits: { type: Object, required: true },
    color: { type: String, required: true }
  },
  setup({ scan, scans, data, yLabel, yLimits, color }, { refs, emit, el }) {
    const width = ref(0);
    const margin = reactive({
      top: 20,
      right: 5,
      bottom: 50,
      left: 40
    });
    const height = ref(280);
    const position = reactive({
      x: 0,
      y: 0
    });
    const hover = ref(false);
    const hoverData = reactive({
      x: "",
      y: ""
    });
    const tooltipPosition = reactive({
      left: "",
      top: ""
    });
    const xLabel = ref("Time (hour)");
    const intervals = reactive({
      hours: 0,
      minutes: 0
    });

    const padded = computed(() => {
      const width = width.value - margin.left - margin.right;
      const height = height.value - margin.top - margin.bottom;
      return { width, height };
    });

    const xLimits = computed(() => {
      let xMin = +scans[0];
      let xMax = +scans[scans.length - 1];
      return { xMin, xMax };
    });

    const ticks = computed(() => {
      const { xMin, xMax } = xLimits;
      // eslint-disable-next-line
      intervals.hours = (xMax - xMin) / (60 * 60);
      // eslint-disable-next-line
      intervals.minutes = ((xMax - xMin) / 3600) * 60;

      let step;
      let xTicks;

      if (intervals.hours >= 1) {
        // check if there is an hour interval
        step = 3600 * Math.floor((intervals.hours / padded.width) * 50); // step is calculated based on the difference of hours
        xTicks =
          scans.length === 1
            ? [xMin]
            : range(
                0,
                3600 * (Math.ceil(intervals.hours) + 1),
                step < 3600 ? 3600 : step
              ).map(d => d + xMin);
        // eslint-disable-next-line
        xLabel.value = "Time (hour)";
      } else if (intervals.minutes >= 1) {
        // check if there is a minute interval
        step = 600; // 10 min
        xTicks =
          scans.length === 1
            ? [xMin]
            : range(0, 3600 * (Math.ceil(intervals.hours) + 1), step).map(
                d => d + xMin
              );
        // eslint-disable-next-line
        xLabel.value = "Time (minutes)";
      } else {
        // if interval is less than an hour and less than a minute display ticks with 20 seconds difference
        step = 20; // 20 seconds (might be changed)
        xTicks =
          scans.length === 1
            ? [xMin]
            : range(0, 60 * (Math.ceil(intervals.minutes) + 1), step).map(
                d => d + xMin
              );
        // eslint-disable-next-line
        xLabel.value = "Time (seconds)";
      }

      const yTicks = 5;
      return { xTicks, yTicks };
    });

    const scales = computed(() => {
      const xMin = xLimits.xMin;
      const xMax = xLimits.xMax;
      const yMin = yLimits.yMin;
      const yMax = yLimits.yMax;

      const x = scaleLinear()
        .domain([xMin, xMax])
        .range([0, padded.width]);

      const y = scaleLinear()
        .domain([yMin, yMax])
        .range([padded.height, 0]);
      return { x, y };
    });

    const axes = computed(() => {
      const { xTicks, yTicks } = ticks;
      const { xMin } = xLimits;
      const { x, y } = scales;
      const { exponent } = yLimits;

      const bottom = axisBottom(x)
        .tickValues(xTicks)
        .tickFormat(t => {
          let time;
          if (intervals.hours >= 1) time = `${Math.floor((t - xMin) / 3600)}`;
          else if (intervals.minutes >= 1)
            time = `${Math.floor((t - xMin) / 60)}`;
          else time = `${Math.floor(t - xMin)}`;
          return time;
        });

      const left = axisLeft(y)
        .ticks(yTicks)
        .tickFormat(d =>
          exponent === undefined ? d : (d / Math.pow(10, exponent)).toFixed(1)
        );
      return { bottom, left };
    });
    const grids = computed(() => {
      const xTicks = ticks.xTicks;

      const x = scales.x;
      const y = scales.y;

      const xGrid = axisBottom(x)
        .tickValues(xTicks)
        .tickSize(padded.height);

      const yGrid = axisLeft(y)
        .ticks(10)
        .tickSize(-padded.width);

      return { xGrid, yGrid };
    });
    const line = computed(() => {
      const { x, y } = scales;

      return line()
        .x(d => x(d.x))
        .y(d => y(d.y))(data);
    });
    const standardDeviationLine = computed(() => {
      const { x, y } = scales;
      const temp = [];
      for (let i = 0; i < data.length; i++) {
        temp.push({
          ...data[i],
          y: data[i].y + standardDeviation[i].y
        });
      }

      for (let i = data.length - 1; i >= 0; i--) {
        temp.push({
          ...data[i],
          y: data[i].y - standardDeviation[i].y
        });
      }
      return line()
        .x(d => x(d.x))
        .y(d => y(d.y))(temp);
    });
    const scanLineTransform = computed(() => {
      const { x } = scales;
      return "translate(" + Math.round(x(parseInt(scan, 10))) + ")";
    });

    function setScan(s) {
      const newScan = closest(
        scans,
        scales.x.invert(
          e.clientX - refs["hover-svg"].getBoundingClientRect().left
        )
      );

      emit("setScan", newScan);
    }

    function onResize() {
      width.value = el.offsetWidth - 7;
      let position = el.getBoundingClientRect();
      position = {
        x: position.left,
        y: position.top
      };
    }

    function hover(e) {
      let temp = e.clientX - refs["hover-svg"].getBoundingClientRect().left;
      const newScan = closest(scans, scales.x.invert(temp));
      const yData =
        data.find(d => d.x === +newScan) != null
          ? data.find(d => d.x === +newScan).y
          : null;
      const xData =
        data.find(d => d.x === +newScan) != null
          ? data.find(d => d.x === +newScan).x
          : null;
      if (yData && xData) {
        hoverData.x = new Date(xData * 1000).toLocaleString();
        const customLabel =
          yLabel === "Cell coverage"
            ? "Cell coverage in %: "
            : yLabel === "Temperature"
            ? "Temperature in °C: "
            : yLabel === "Area (μm²)"
            ? "Area (μm²): "
            : "Speed (μm²/s): ";
        const customData =
          yLabel === "Cell coverage"
            ? yData.toFixed(2).toString()
            : yLabel === "Temperature"
            ? yData.toFixed(1).toString()
            : yLabel === "Area (μm²)"
            ? dataFormatters.getScratchArea(yData)
            : dataFormatters.getScratchSpeed(yData);
        hoverData.y = customLabel + customData;
        tooltipPosition.left = e.clientX + 20 + "px";
        tooltipPosition.top = e.clientY + "px";
        hover = true;
      }
    }
    return {};
  }
};
</script>

<style lang="scss" scoped>
#data-line {
  fill: none;
  stroke-width: 3px;
  stroke-linejoin: round;
}

.grid {
  /deep/ line,
  /deep/ path {
    opacity: 0.1;
  }
  /deep/ text {
    display: none;
  }
}

.label {
  font-size: 14px;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
