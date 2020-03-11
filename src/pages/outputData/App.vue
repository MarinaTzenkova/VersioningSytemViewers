<template>
  <div class="flex items-center justify-center h-screen bg-blue-100 grid">
    <div></div>
    <div class="bg-gray-400 h-auto px-5 py-3">
      <div class="text-center text-lg font-bold">Available data</div>
      <div v-if="fetched">
        <div
          v-for="version in output"
          :key="version"
          class="cursor-pointer mt-2 bg-gray-200"
          @click="redirect(version)"
        >
          <version-box :data="metadata[version]" />
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import axios from "axios";
import VersionBox from "./VersionBox.vue";
export default {
  components: {
    VersionBox
  },
  props: {
    experimentId: { type: String, required: true }
  },
  data() {
    return {
      output: [],
      metadata: {},
      fetched: false
    };
  },
  beforeMount() {
    this.fetch();
  },
  methods: {
    fetch() {
      // there must be a smarter way, maybe component specific logic?
      axios
        .get(
          `http://127.0.0.1:10000/devstoreaccount1/cache/${this.experimentId}/availableOutput.json`
        )
        .then(({ data }) => {
          this.output = data.data[this.experimentId];
          const promises = [];

          // fetch metadata for each version
          this.output.forEach(version => {
            const type = version.includes("scr") ? "scratch" : "confluence";
            promises.push(this.fetchMetadata(version, type));
          });

          Promise.all(promises).finally(() => {
            this.fetched = true;
          });
        });
    },
    fetchMetadata(version, type) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `http://127.0.0.1:10000/devstoreaccount1/test/${this.experimentId}/${type}/${version}/metadata.json`
          )
          .then(({ data }) => {
            this.metadata[version] = data;
            resolve();
          })
          .catch(e => {
            console.log(e);
            reject();
          });
      });
    },
    redirect(version) {
      window.location.href = `/${this.experimentId}/lux2?version=${version}`;
    }
  }
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
