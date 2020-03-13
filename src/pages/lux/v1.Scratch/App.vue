<template>
  <base-layout>
    <div class="container mt-4 px-4">
      <tab-component :tab="tab" :tabs="tabs" @onChange="setTab" />
      <div class="flex flex-wrap items-start">
        <div class="flex flex-wrap w-full lg:w-3/5">
          <div class="px-1 mb-2 w-full">
            <lux2-video-player v-if="fetchedScans" />
          </div>
          <div class="px-1 mb-2 w-full">
            <coverage-graph v-if="fetchedConfluence && fetchedScans" />
          </div>
          <div class="px-1 mb-2 w-full">
            <scratch-graph v-if="fetchedScratch && fetchedScans" />
          </div>
          <div class="px-1 mb-2 w-full">
            <temperature-graph v-if="fetchedScans" />
          </div>
        </div>
        <div class="flex flex-wrap w-full lg:pl-4 lg:w-2/5">
          <version-info-box />
          <!-- experiment data -->
          <!-- experiment notes -->
          <!-- experiment notifications -->
          <!-- experiment logbook -->
        </div>
      </div>
    </div>
  </base-layout>
</template>

<script>
import setup from "./_providers/setup";
import { provide, computed } from "@vue/composition-api";

import VersionInfoBox from "./VersionInfoBox.vue";
import CoverageGraph from "./wrappers/CoverageGraphWrapper.vue";
import ScratchGraph from "./wrappers/ScratchGraphWrapper.vue";
import TemperatureGraph from "./wrappers/TemperatureGraphWrapper.vue";
import Lux2VideoPlayer from "./wrappers/Lux2VideoPlayerWrapper.vue";

// global components
import TabComponent from "@/shared/components/layout/Tabs.vue";
import BaseLayout from "@/shared/components/layout/BaseLayout.vue";

export default {
  components: {
    VersionInfoBox,
    CoverageGraph,
    ScratchGraph,
    TemperatureGraph,
    Lux2VideoPlayer,
    TabComponent,
    BaseLayout
  },
  props: {
    experimentId: { type: String, required: true }
  },
  setup(props, { root }) {
    //find a way to link endpoints to this vue instance through root
    const version = root.$route.query.version;
    const endpoints = root.$endpoint;
    const state = setup(props.experimentId, version, endpoints);
    const fetchedScans = computed(() => state.timepoints.fetched);
    const fetchedConfluence = computed(() => state.coverage.fetched);
    const fetchedScratch = computed(() => state.scratch.fetched);
    provide("data", state);

    const tab = computed(() => {
      return state.tabs.active;
    });

    const tabs = computed(() => {
      return state.tabs.names;
    });

    const setTab = computed(() => {
      return state.setTab;
    });

    const algorithms = computed(() => {
      return state.versionOfData.algorithms;
    });

    //compute images per algorithm based on version or latest ?

    return {
      tabs,
      algorithms,
      tab,
      setTab,
      fetchedConfluence,
      fetchedScratch,
      fetchedScans
    };
  }
};
</script>
