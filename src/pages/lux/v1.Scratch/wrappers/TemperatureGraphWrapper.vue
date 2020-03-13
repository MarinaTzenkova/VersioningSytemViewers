<template>
  <div>
    <collapsable-panel :collapsable="false">
      <template #head>Temperature</template>
      <template #body>
        <line-graph
          :scan="scan"
          :scans="scans"
          :data="preparedData"
          :y-limits="yLimits"
          :color="'#00ff00'"
          :y-label="'Temperature'"
          @setScan="setTimepoint"
        />
      </template>
    </collapsable-panel>
  </div>
</template>

<script>
import { min, max } from "d3";
import CollapsablePanel from "@/shared/components/layout/CollapsablePanel.vue";
import LineGraph from "@/shared/components/graphs/LineGraph.vue";
import { inject, computed, watch, ref } from "@vue/composition-api";
export default {
  components: { CollapsablePanel, LineGraph },
  setup() {
    const preparedData = ref([]);
    const { timepoints, setTimepoint } = inject("data");
    const scan = computed(() => timepoints.active);
    const scans = computed(() => timepoints.all);
    const fetchedScans = computed(() => timepoints.fetched);
    const temperature = computed(() => timepoints.data);

    watch(
      () => fetchedScans,
      fetched => {
        if (fetched && temperature.value) {
          scans.value.forEach(scan => {
            if (
              temperature.value[scan] !== undefined &&
              temperature.value[scan] !== null
            ) {
              if (
                temperature.value[scan] < 1000 &&
                temperature.value[scan] > -1000
              ) {
                preparedData.value.push({
                  x: parseInt(scan),
                  y: temperature.value[scan]
                });
              }
            }
          });
        }
      },
      { deep: true }
    );

    const yLimits = computed(() => {
      const minVal = min(preparedData.value, d => d.y);
      const maxVal = max(preparedData.value, d => d.y);
      let yMin = Math.ceil((minVal - 1) * 10) / 10;
      let yMax = Math.floor((maxVal + 1) * 10) / 10;
      return { yMin, yMax, exponent: undefined };
    });

    return {
      scan,
      scans,
      setTimepoint,
      preparedData,
      yLimits
    };
  }
};
</script>
