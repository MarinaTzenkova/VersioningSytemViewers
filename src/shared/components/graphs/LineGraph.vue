<template>
  <div class="w-full">
    <svg
      id="chart-svg"
      class="bg-white font-sans select-none"
      :width="width"
      :height="height"
      style="background-color: white;"
    >
      <g :transform="`translate(${margin.left}, ${margin.top})`">
        <!-- The 2 grids are placed first so that they appear behind everything else -->
        <g v-axis="grids.xGrid" class="x grid"></g>
        <g v-axis="grids.yGrid" class="y grid"></g>

        <path
          v-if="scans.length > 1"
          id="data-line"
          :d="line"
          :style="{ stroke: color }"
        ></path>

        <g :transform="scanLineTransform" style="transition: 100ms;">
          <rect
            x="0"
            y="0"
            width="1"
            :height="padded.height"
            fill="black"
          ></rect>
        </g>

        <rect
          ref="hover-svg"
          x="0"
          :y="scales.y(yLimits.yMax)"
          :height="padded.height"
          fill="black"
          :width="padded.width"
          opacity="0"
          class="cursor-PointClasser"
          @click="setScan"
          @mousemove="testHover"
          @mouseleave="hover = false"
        ></rect>
        <foreignObject
          v-if="yLimits.exponent !== undefined"
          x="-23"
          y="-20"
          width="30"
          height="25"
        >
          <div style="font-size: 10px;">
            x10
            <sup>{{ yLimits.exponent }}</sup>
          </div>
        </foreignObject>

        <!-- The 2 axes, had to use a custom directive for this, defined as v-axis -->
        <g
          v-axis="axes.bottom"
          class="x axis"
          :transform="`translate(0 , ${padded.height})`"
        ></g>
        <g v-axis="axes.left" class="y axis no-line" text-anchor="end"></g>

        <!-- The text labels for the 2 axes -->
        <text
          class="label"
          :transform="
            `translate(${parseInt(-margin.left / 2 - 10)}, ${parseInt(
              padded.height / 2
            )}) rotate(-90)`
          "
          text-anchor="middle"
        >
          {{ yLabel }}
        </text>
        <text
          class="label"
          :transform="
            `translate(${padded.width / 2}, ${padded.height +
              margin.bottom / 2 +
              15})`
          "
          text-anchor="middle"
        >
          {{ xLabel }}
        </text>

        <circle
          v-if="scans.length === 1"
          :cx="scales.x(data[0].x)"
          :cy="scales.y(data[0].y)"
          r="5"
          :style="{ fill: color }"
        ></circle>
      </g>
    </svg>
    <div v-if="scans.length > 1" class="relative">
      <div
        v-if="hover"
        class="fixed w-56 bg-white rounded border border-grey-lighter py-2 px-3"
        :style="[tooltipPosition]"
      >
        <p class="font-bold text-center">{{ hoverData.x }}</p>
        <p class="text-sm text-center" v-html="hoverData.y"></p>
      </div>
    </div>
  </div>
</template>

<script>
import { select, axisBottom, scaleLinear, axisLeft, line, range } from "d3";
import { dataFormatters } from "@/shared/utils";
function closest(arr, goal) {
  return arr.reduce((prev, curr) =>
    Math.abs(+curr - goal) < Math.abs(+prev - goal) ? curr : prev
  );
}

export default {
  directives: {
    axis: {
      bind(el, binding) {
        select(el).call(binding.value);
      },
      componentUpdated(el, binding) {
        select(el).call(binding.value);
      }
    }
  },
  props: {
    scan: { type: String, required: true },
    scans: { type: Array, required: true },
    data: { type: Array, required: true },
    yLabel: { type: String, required: true },
    yLimits: { type: Object, required: true },
    color: { type: String, required: true }
  },
  data() {
    return {
      width: 0,
      margin: { top: 20, right: 5, bottom: 50, left: 40 },
      height: 280,
      position: { x: 0, y: 0 },
      hover: false,
      hoverData: {
        x: "",
        y: ""
      },
      tooltipPosition: {
        left: "",
        top: ""
      },
      xLabel: "Time (hour)",
      intervals: {
        hours: 0,
        minutes: 0
      }
    };
  },
  computed: {
    padded() {
      const width = this.width - this.margin.left - this.margin.right;
      const height = this.height - this.margin.top - this.margin.bottom;
      return { width, height };
    },
    xLimits() {
      let xMin = +this.scans[0];
      let xMax = +this.scans[this.scans.length - 1];
      return { xMin, xMax };
    },
    ticks() {
      const { xMin, xMax } = this.xLimits;
      // eslint-disable-next-line
      this.intervals.hours = (xMax - xMin) / (60 * 60);
      // eslint-disable-next-line
      this.intervals.minutes = ((xMax - xMin) / 3600) * 60;

      let step;
      let xTicks;

      if (this.intervals.hours >= 1) {
        // check if there is an hour interval
        step =
          3600 * Math.floor((this.intervals.hours / this.padded.width) * 50); // step is calculated based on the difference of hours
        xTicks =
          this.scans.length === 1
            ? [xMin]
            : range(
                0,
                3600 * (Math.ceil(this.intervals.hours) + 1),
                step < 3600 ? 3600 : step
              ).map(d => d + xMin);
        // eslint-disable-next-line
        this.xLabel = "Time (hour)";
      } else if (this.intervals.minutes >= 1) {
        // check if there is a minute interval
        step = 600; // 10 min
        xTicks =
          this.scans.length === 1
            ? [xMin]
            : range(0, 3600 * (Math.ceil(this.intervals.hours) + 1), step).map(
                d => d + xMin
              );
        // eslint-disable-next-line
        this.xLabel = "Time (minutes)";
      } else {
        // if interval is less than an hour and less than a minute display ticks with 20 seconds difference
        step = 20; // 20 seconds (might be changed)
        xTicks =
          this.scans.length === 1
            ? [xMin]
            : range(0, 60 * (Math.ceil(this.intervals.minutes) + 1), step).map(
                d => d + xMin
              );
        // eslint-disable-next-line
        this.xLabel = "Time (seconds)";
      }

      const yTicks = 5;
      return { xTicks, yTicks };
    },
    scales() {
      const xMin = this.xLimits.xMin;
      const xMax = this.xLimits.xMax;
      const yMin = this.yLimits.yMin;
      const yMax = this.yLimits.yMax;

      const x = scaleLinear()
        .domain([xMin, xMax])
        .range([0, this.padded.width]);

      const y = scaleLinear()
        .domain([yMin, yMax])
        .range([this.padded.height, 0]);
      return { x, y };
    },
    axes() {
      const { xTicks, yTicks } = this.ticks;
      const { xMin } = this.xLimits;
      const { x, y } = this.scales;
      const { exponent } = this.yLimits;

      const bottom = axisBottom(x)
        .tickValues(xTicks)
        .tickFormat(t => {
          let time;
          if (this.intervals.hours >= 1)
            time = `${Math.floor((t - xMin) / 3600)}`;
          else if (this.intervals.minutes >= 1)
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
    },
    grids() {
      const xTicks = this.ticks.xTicks;

      const x = this.scales.x;
      const y = this.scales.y;

      const xGrid = axisBottom(x)
        .tickValues(xTicks)
        .tickSize(this.padded.height);

      const yGrid = axisLeft(y)
        .ticks(10)
        .tickSize(-this.padded.width);

      return { xGrid, yGrid };
    },
    line() {
      const { x, y } = this.scales;
      const data = this.data;

      return line()
        .x(d => x(d.x))
        .y(d => y(d.y))(data);
    },
    standardDeviationLine() {
      const { x, y } = this.scales;
      const data = [];
      for (let i = 0; i < this.data.length; i++) {
        data.push({
          ...this.data[i],
          y: this.data[i].y + this.standardDeviation[i].y
        });
      }

      for (let i = this.data.length - 1; i >= 0; i--) {
        data.push({
          ...this.data[i],
          y: this.data[i].y - this.standardDeviation[i].y
        });
      }
      return line()
        .x(d => x(d.x))
        .y(d => y(d.y))(data);
    },
    scanLineTransform() {
      const { x } = this.scales;
      const scan = this.scan;
      return "translate(" + Math.round(x(parseInt(scan, 10))) + ")";
    }
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    setScan(e) {
      const newScan = closest(
        this.scans,
        this.scales.x.invert(
          e.clientX - this.$refs["hover-svg"].getBoundingClientRect().left
        )
      );

      this.$emit("setScan", newScan);
    },
    onResize() {
      this.width = this.$el.offsetWidth - 7;
      let position = this.$el.getBoundingClientRect();
      this.position = {
        x: position.left,
        y: position.top
      };
    },
    testHover(e) {
      let temp =
        e.clientX - this.$refs["hover-svg"].getBoundingClientRect().left;
      const newScan = closest(this.scans, this.scales.x.invert(temp));
      const yData =
        this.data.find(d => d.x === +newScan) != null
          ? this.data.find(d => d.x === +newScan).y
          : null;
      const xData =
        this.data.find(d => d.x === +newScan) != null
          ? this.data.find(d => d.x === +newScan).x
          : null;
      if (yData && xData) {
        this.hoverData.x = new Date(xData * 1000).toLocaleString();
        const customLabel =
          this.yLabel === "Cell coverage"
            ? "Cell coverage in %: "
            : this.yLabel === "Temperature"
            ? "Temperature in °C: "
            : this.yLabel === "Area (μm²)"
            ? "Area (μm²): "
            : "Speed (μm²/s): ";
        const customData =
          this.yLabel === "Cell coverage"
            ? yData.toFixed(2).toString()
            : this.yLabel === "Temperature"
            ? yData.toFixed(1).toString()
            : this.yLabel === "Area (μm²)"
            ? dataFormatters.getScratchArea(yData)
            : dataFormatters.getScratchSpeed(yData);
        this.hoverData.y = customLabel + customData;
        this.tooltipPosition.left = e.clientX + 20 + "px";
        this.tooltipPosition.top = e.clientY + "px";
        this.hover = true;
      }
    }
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
