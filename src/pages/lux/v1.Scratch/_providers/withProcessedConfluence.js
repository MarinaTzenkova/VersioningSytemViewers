import { reactive, watch, ref } from "@vue/composition-api";
import axios from "axios";
export default function(experimentId, version, endpoint) {
  const coverage = reactive({
    ids: [],
    byId: {},
    fetched: ref(false)
  });

  watch(
    () => ({
      confluence: version.selected.confluence
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
        coverage.ids = Object.keys(data.data);
        coverage.ids.forEach(id => {
          coverage.byId[id] = data.data[id];
        });
        coverage.fetched = true;
      })
      .catch();
  }

  return {
    coverage
  };
}
