<template>
  <div class="flex items-center justify-center h-screen bg-blue-100 grid">
    <div></div>
    <div class="bg-gray-400 h-auto px-5 py-3">
      <div class="text-center text-lg font-bold">Available data</div>
      <div
        v-for="(version, index) in versions.ids"
        :key="index"
        class="cursor-pointer mt-2 bg-gray-200"
        @click="dropdown(index)"
      >
        <version-box
          v-if="metadata.byId[version]"
          :data="metadata.byId[version]"
        />
        <div :ref="`dropdown-${index}`" style="display: none">
          <div @click="lux2(version)">Go to Lux2 viewer</div>
          <div @click="lux3(version)">Go to Lux3 viewer</div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import setup from "./_providers/setup";
import VersionBox from "./VersionBox.vue";
export default {
  components: {
    VersionBox
  },
  props: {
    experimentId: { type: String, required: true }
  },
  setup(props, { root, refs }) {
    const endpoints = root.$endpoint;
    const { metadata, versions, lux2, lux3 } = setup(
      props.experimentId,
      endpoints
    );

    function dropdown(index) {
      const drop = refs[`dropdown-${index}`];
      drop[0].style.display =
        drop[0].style.display == "none" ? "block" : "none";
    }

    return { versions, metadata, lux2, dropdown, lux3 };
  }
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
