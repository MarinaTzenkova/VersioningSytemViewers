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
    const { coverage, timepoints } = inject("data");
    const scan = computed(() => timepoints.active);
    const scans = computed(() => timepoints.all);
    const yLimits = computed(() => {
      let yMin = 0;
      let yMax = 100;
      return { yMin, yMax, exponent: undefined };
    });
    watch(
      () => coverage,
      ({ byId }) => {
        if (byId) {
          scans.value.forEach(s => {
            if (byId[s].coverage !== undefined && byId[s].coverage !== null)
              data.value.push({
                x: parseInt(s),
                y: byId[s].coverage
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
      data
    };
  }
};
</script>
