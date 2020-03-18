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
    const { confluence, timepoints, setTimepoint } = inject("data");
    const scan = computed(() => timepoints.active);
    const scans = computed(() => timepoints.ids);
    const yLimits = computed(() => {
      let yMin = 0;
      let yMax = 100;
      return { yMin, yMax, exponent: undefined };
    });
    watch(
      () => ({ ids: timepoints.ids, byId: confluence.byId }),
      ({ ids, byId }) => {
        if (ids.length > 0) {
          ids.forEach(s => {
            if (byId[s]) {
              if (byId[s].coverage !== undefined && byId[s].coverage !== null)
                data.value.push({
                  x: parseInt(s),
                  y: byId[s].coverage
                });
            }
          });
        }
      },
      { deep: true }
    );
    return {
      confluence,
      scan,
      scans,
      yLimits,
      data,
      setTimepoint
    };
  }
};
</script>
