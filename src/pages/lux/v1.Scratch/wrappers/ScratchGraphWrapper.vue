<template>
  <div>
    <collapsable-panel :collapsable="true">
      <template v-slot:head>
        Scratch
      </template>
      <template #body>
        <!-- scan, scans, data, ylimits, color, label, interval?, setscan -->
        <div>
          <line-graph
            :scan="scan"
            :scans="scans"
            :data="data.area"
            :y-limits="yLimits.area"
            :color="'#00ff00'"
            :y-label="'Area (μm²)'"
            @setScan="setTimepoint"
          />
          <line-graph
            :scan="scan"
            :scans="scans"
            :data="data.speed"
            :y-limits="yLimits.speed"
            :color="'#00ff00'"
            :y-label="'Speed (μm²/s)'"
            @setScan="setTimepoint"
          />
        </div>
      </template>
    </collapsable-panel>
  </div>
</template>

<script>
import { min, max } from "d3";
import CollapsablePanel from "@/shared/components/layout/CollapsablePanel.vue";
import LineGraph from "@/shared/components/graphs/LineGraph.vue";
import { inject, computed, ref, watch } from "@vue/composition-api";
const computeYLimits = data => {
  let yMin = min(data, d => d.y);
  let yMax = max(data, d => d.y);

  yMin = yMin === undefined ? 0 : yMin;
  yMax = yMax === undefined ? 100 : yMax;

  let exponent =
    yMin === undefined
      ? undefined
      : parseInt(((yMin + yMax) / 2).toExponential(1).split("e+")[1], 10);

  return { yMin, yMax, exponent };
};

const computeLineData = (data, scan) => {
  if (data !== undefined) {
    return { x: parseInt(scan), y: data };
  }
};
export default {
  components: { CollapsablePanel, LineGraph },
  setup() {
    const data = ref({
      speed: [],
      area: []
    });
    const { scratch, timepoints, setTimepoint } = inject("data");
    const scan = computed(() => timepoints.active);
    const scans = computed(() => timepoints.all);

    watch(
      () => scratch,
      ({ byId }) => {
        if (byId) {
          scans.value.forEach(s => {
            if (s in scratch.byId) {
              data.value.speed.push(computeLineData(scratch.byId[s].speed, s));
              data.value.area.push(computeLineData(scratch.byId[s].area, s));
            }
          });
        }
      },
      { deep: true }
    );
    const yLimits = computed(() => {
      let speed = computeYLimits(data.value.speed);
      let area = computeYLimits(data.value.area);
      area.yMin = 0;
      return { speed, area };
    });
    return { scratch, scan, scans, setTimepoint, yLimits, data };
  }
};
</script>
