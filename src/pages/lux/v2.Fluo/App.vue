<template>
  <base-layout>
    <div class="container mt-4 px-4">
      <tab-component :tab="tab" :tabs="tabs" @onChange="setTab" />
      <div class="flex flex-wrap items-start">
        <div class="flex flex-wrap w-full">
          <div class="px-1 mb-2 w-full">
            <lux3-video-player v-if="fetchedScans && fetchedImages" />
          </div>
          <div class="w-full lg:w-4/6">
            <div class="px-1 mb-2 w-full">
              <confluence-graph v-if="fetchedConfluence" />
            </div>
            <div class="px-1 mb-2 w-full">
              <scratch-graph v-if="fetchedScratch" />
            </div>
            <div class="px-1 mb-2 w-full"></div>
          </div>
        </div>
        <div class="flex flex-wrap w-full lg:pl-4 lg:w-2/5"></div>
      </div>
    </div>
  </base-layout>
</template>

<script>
import setup from "./_providers/setup";
import { provide, computed, ref, watch } from "@vue/composition-api";

import Lux3VideoPlayer from "./wrappers/Lux3VideoPlayer.vue";
import ConfluenceGraph from "./wrappers/ConfluenceGraphWrapper.vue";
import ScratchGraph from "./wrappers/ScratchGraphWrapper.vue";

// global components
import BaseLayout from "@/shared/components/layout/BaseLayout.vue";
import TabComponent from "@/shared/components/layout/Tabs.vue";
export default {
  components: {
    BaseLayout,
    TabComponent,
    Lux3VideoPlayer,
    ConfluenceGraph,
    ScratchGraph
  },
  props: {
    experimentId: { type: String, required: true }
  },
  setup(props, { root }) {
    const fetchedImages = ref(false);
    const { experimentId } = props;
    const version = root.$route.query.version;
    const endpoints = root.$endpoint;
    const state = setup(experimentId, version, endpoints);
    provide("data", state);

    const fetchedScans = computed(() => state.timepoints.fetched);
    const fetchedConfluence = computed(() => state.confluence.fetched);
    const fetchedScratch = computed(() => state.scratch.fetched);

    const tab = computed(() => {
      return state.tabs.active;
    });

    const tabs = computed(() => {
      return state.tabs.names;
    });

    const setTab = computed(() => {
      return state.setTab;
    });

    const metadata = computed(() => {
      return state.metadata;
    });

    watch(
      () => ({ urls: state.images.urls }),
      ({ urls }) => {
        if (urls) {
          fetchedImages.value = true;
        }
      },
      { deep: true }
    );

    return {
      fetchedScans,
      fetchedImages,
      fetchedScratch,
      fetchedConfluence,
      tab,
      tabs,
      setTab,
      metadata
    };
  }
};
</script>

<style></style>
