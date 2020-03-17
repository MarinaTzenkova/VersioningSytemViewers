<template>
  <div>
    <collapsable-panel :collapsable="false">
      <template #head>Setting</template>
      <template #body>
        <div class="settings">
          <settings-box
            v-if="overlays.Brightfield"
            class="mt-2"
            :name="'Brightfield'"
            :selected="true"
            @checked="settings.brightfieldOptions.show = $event"
          />
          <overlay-settings
            v-if="overlays.Red"
            name="Red"
            :options="settings.redOptions"
            @saveSettings="saveOptions($event)"
          />
          <!-- @resetSettings="resetSettings($event)" -->
          <overlay-settings
            v-if="overlays.Green"
            name="Green"
            :options="settings.greenOptions"
            @saveSettings="saveOptions($event)"
          />
          <!-- @resetSettings="resetSettings($event)" -->
          <overlay-settings
            v-if="overlays.Confluence && tab === 'Confluence'"
            name="Confluence"
            :options="settings.confluenceOptions"
            @saveSettings="saveOptions($event)"
          />
          <!-- @resetSettings="resetSettings($event)" -->
          <!-- :disable-save="fetching.confluence" -->
        </div>
      </template>
    </collapsable-panel>
  </div>
</template>

<script>
import { inject, computed } from "@vue/composition-api";

import CollapsablePanel from "@/shared/components/layout/CollapsablePanel";
import SettingsBox from "@/shared/components/videoPlayerGl/SettingsBox.vue";
import OverlaySettings from "@/shared/components/videoPlayerGl/OverlaySettings.vue";
export default {
  components: {
    CollapsablePanel,
    SettingsBox,
    OverlaySettings
  },
  setup() {
    const { channels, tabs, settings, saveOptions } = inject("data");
    const tab = computed(() => tabs.active);
    const overlays = computed(() => channels.overlays);
    return {
      channels,
      overlays,
      tab,
      settings,
      saveOptions
    };
  }
};
</script>

<style scoped>
.settings {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  grid-column-gap: 0.5em;
  grid-row-gap: 0.5em;
}
</style>
