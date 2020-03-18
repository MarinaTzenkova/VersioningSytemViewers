import { reactive, watch, ref } from "@vue/composition-api";
import axios from "axios";
import Vue from "vue";
export default function(experimentId, version, endpoint) {
  const confluence = reactive({
    ids: [],
    byId: {},
    fetched: ref(false)
  });

  watch(
    () => ({
      confluence: version.selected.Confluence
    }),
    ({ confluence }) => {
      if (confluence) fetchConfluenceJson(confluence);
    },
    { deep: true }
  );

  function fetchConfluenceJson(dataVersion) {
    axios
      .get(
        `${endpoint.lux2CacheBlob}${experimentId}/confluence/${dataVersion}/cache.json`
      )
      .then(({ data }) => {
        confluence.ids = Object.keys(data.data);
        confluence.ids.forEach(id => {
          Vue.set(confluence.byId, id, data.data[id]);
        });
        confluence.fetched = true;
      })
      .catch();
  }

  return {
    confluence
  };
}
