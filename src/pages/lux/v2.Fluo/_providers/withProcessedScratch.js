import { reactive, watch, ref } from "@vue/composition-api";
import axios from "axios";
import Vue from "vue";
export default function(experimentId, version, endpoint) {
  const scratch = reactive({
    ids: [],
    byId: {},
    fetched: ref(false)
  });

  watch(
    () => ({
      scratch: version.selected.Scratch
    }),
    ({ scratch }) => {
      if (scratch) fetchScratchJson(scratch);
    },
    { deep: true }
  );

  function fetchScratchJson(dataVersion) {
    axios
      .get(
        `${endpoint.lux2CacheBlob}${experimentId}/scratch/${dataVersion}/cache.json`
      )
      .then(({ data }) => {
        scratch.ids = Object.keys(data.data);
        scratch.ids.forEach(id => {
          Vue.set(scratch.byId, id, data.data[id]);
        });
        scratch.fetched = true;
      })
      .catch();
  }

  return {
    scratch
  };
}
