<template>
  <div>
    <collapsable-panel :collapsable="true">
      <template v-slot:head>
        Cell coverage
      </template>
      <template #body>
        <!-- scan, scans, data, ylimits, color, label, interval?, setscan -->
        <line-graph
          :scan="scan"
          :scans="scans"
          :y-limits="yLimits"
          :data="data"
          :y-label="'Cell coverage'"
          :color="'#00ff00'"
          @setScan="setTimepoint"
        ></line-graph>
      </template>
    </collapsable-panel>
  </div>
</template>

<script>
import CollapsablePanel from "@/shared/components/layout/CollapsablePanel.vue";
import LineGraph from "@/shared/components/graphs/LineGraph.vue";
import { inject, computed, watch, ref } from "@vue/composition-api";
export default {
  components: { CollapsablePanel, LineGraph },
  setup() {
    const data = ref([]);
    const { coverage, timepoints, setTimepoint } = inject("data");
    const scan = computed(() => timepoints.active);
    const scans = computed(() => timepoints.all);
    const fetchedConfluence = computed(() => coverage.fetched);
    const yLimits = computed(() => {
      let yMin = 0;
      let yMax = 100;
      return { yMin, yMax, exponent: undefined };
    });
    watch(
      () => fetchedConfluence,
      fetched => {
        if (coverage.byId && fetched) {
          scans.value.forEach(s => {
            if (
              coverage.byId[s].coverage !== undefined &&
              coverage.byId[s].coverage !== null
            )
              data.value.push({
                x: parseInt(s),
                y: coverage.byId[s].coverage
              });
          });
        }
      },
      { deep: true }
    );
    return {
      coverage,
      scan,
      scans,
      yLimits,
      data,
      setTimepoint
    };
  }
};
</script>
