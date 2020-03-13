<template>
  <div class=" w-full">
    <collapsable-panel :collapsable="false">
      <template #head>Version info</template>
      <template #body>
        <div class="flex flex-col">
          <div class="flex flex-row">
            <div>Time of run</div>
            <div class="font-bold ml-2">
              {{ metadata.confluence.timestamp | datetime }}
            </div>
          </div>
          <div class="flex flex-row">
            <div>
              Settings used
            </div>
            <div class="font-bold ml-2">Threshold {{ threshold }}</div>
          </div>
        </div>
      </template>
    </collapsable-panel>
  </div>
</template>

<script>
import CollapsablePanel from "@/shared/components/layout/CollapsablePanel.vue";
import { inject, computed } from "@vue/composition-api";
export default {
  components: { CollapsablePanel },
  setup() {
    const { versionOfData, metadata } = inject("data");
    const threshold = computed(() => metadata.confluence.settings.threshold);
    return { versionOfData, metadata, threshold };
  }
};
</script>

<style></style>
