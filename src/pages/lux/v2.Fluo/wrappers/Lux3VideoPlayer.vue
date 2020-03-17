<template>
  <div>
    <video-player
      v-if="images.urls && fetchedScans"
      :images="images"
      :index="scanIndex"
      :channels="channels"
      :channel-settings="settings"
      :tab="tab"
      :image-size="[640, 480]"
    >
      <template #head></template>
      <template #sidebar>
        <div>
          <settings-wrapper />
          <version-box />
        </div>
      </template>
      <template #footer></template>
    </video-player>
  </div>
</template>

<script>
import { inject, computed } from "@vue/composition-api";
import SettingsWrapper from "./SettingsWrapper.vue";
import VersionBox from "../VersionInfoBox.vue";

import VideoPlayer from "@/shared/components/videoPlayerGl/VideoPlayer.vue";
export default {
  components: { VideoPlayer, SettingsWrapper, VersionBox },
  setup() {
    const { channels, images, timepoints, tabs, settings } = inject("data");

    const tab = computed(() => tabs.active);
    const fetchedScans = computed(() => timepoints.fetched);
    const scans = computed(() => timepoints.ids);
    const scan = computed(() => timepoints.active);

    const scanIndex = computed(() => scans.value.indexOf(scan.value));

    return {
      tab,
      images,
      scans,
      scan,
      scanIndex,
      channels,
      fetchedScans,
      settings
    };
  }
};
</script>

<style></style>
