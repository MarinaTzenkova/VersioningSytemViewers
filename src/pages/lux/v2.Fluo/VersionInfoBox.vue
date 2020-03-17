<template>
  <div class=" w-full">
    <collapsable-panel :collapsable="false">
      <template #head>Version info</template>
      <template #body>
        <div class="flex flex-col">
          <div>
            <div class="flex flex-row">
              <div>Time of run</div>
              <div class="font-bold ml-2">
                {{ metadata.Confluence.timestamp | datetime }}
              </div>
            </div>
            <div class="flex flex-row">
              <div>
                Settings used
              </div>
              <div class="font-bold ml-2">
                Threshold {{ metadata.Confluence.settings.threshold }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </collapsable-panel>
  </div>
</template>

<script>
import CollapsablePanel from "@/shared/components/layout/CollapsablePanel.vue";
import { inject } from "@vue/composition-api";
export default {
  components: { CollapsablePanel },
  setup() {
    const { latestVersionOfProcessedData, metadata } = inject("data");
    return { latestVersionOfProcessedData, metadata };
  }
};
</script>

<style></style>
