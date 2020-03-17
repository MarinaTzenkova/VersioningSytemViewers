<template>
  <div>
    <video-player
      :images="snapshots"
      :index="scanIndex"
      :channels="overlays"
      :channel-settings="settings"
      :tab="tab"
      :image-size="[640, 480]"
      @indexChanged="setIndex($event)"
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
    const {
      channels,
      images,
      timepoints,
      tabs,
      settings,
      setTimepoint
    } = inject("data");

    const tab = computed(() => tabs.active);
    const fetchedScans = computed(() => timepoints.fetched);
    const scans = computed(() => timepoints.ids);
    const scan = computed(() => timepoints.active);

    const scanIndex = computed(() => scans.value.indexOf(scan.value));
    const snapshots = computed(() => images.urls);
    const overlays = computed(() => channels.overlays);
    function setIndex(val) {
      const id = scans.value[val];
      setTimepoint(id);
    }

    return {
      tab,
      snapshots,
      scans,
      scan,
      scanIndex,
      channels,
      fetchedScans,
      settings,
      setTimepoint,
      overlays,
      setIndex
    };
  }
};
</script>

<style></style>
