<template>
  <!-- base layout, wrapper loading -->
  <div class="container mt-4 px-4">
    <!-- tabs -->
    <div class="flex flex-wrap items-start">
      <div class="flex flex-wrap w-full lg:w-3/5">
        <div class="px-1 mb-2 w-full">
          <lux2-video-player />
        </div>
        <div class="px-1 mb-2 w-full">
          <coverage-graph />
        </div>
        <div class="px-1 mb-2 w-full">
          <!-- scratch graph -->
        </div>
        <div class="px-1 mb-2 w-full">
          <!-- temperature graph -->
        </div>
      </div>
      <div class="flex flex-wrap w-full lg:pl-4 lg:w-2/5">
        <!-- experiment data -->
        <!-- experiment notes -->
        <!-- experiment notifications -->
        <!-- experiment logbook -->
      </div>
    </div>
    <div>{{ versionOfData }}</div>
  </div>
</template>

<script>
import setup from "./_providers/setup";
import { provide } from "@vue/composition-api";
import CoverageGraph from "./wrappers/CoverageGraphWrapper.vue";
import Lux2VideoPlayer from "./wrappers/Lux2VideoPlayerWrapper.vue";
export default {
  components: {
    CoverageGraph,
    Lux2VideoPlayer
  },
  props: {
    experimentId: { type: String, required: true }
  },
  setup(props, { root }) {
    //find a way to link endpoints to this vue instance through root
    const version = root.$route.query.version;
    const state = setup(props.experimentId, version);
    provide("data", state);

    //compute images per algorithm based on version or latest ?

    return { ...state };
  }
};
</script>
