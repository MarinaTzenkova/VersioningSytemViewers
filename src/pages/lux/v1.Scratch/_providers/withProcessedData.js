import { reactive, watch } from "@vue/composition-api";
import axios from "axios";
export default function(experimentId, version) {
  const coverage = reactive({
    ids: [],
    byId: {}
  });

  watch(
    () => version,
    ({ selected }) => {
      console.log(selected);
      if (selected) fetchJsonResults(selected);
    },
    { deep: true }
  );

  function fetchJsonResults(dataVersion) {
    axios
      .get(
        `http://127.0.0.1:10000/devstoreaccount1/cache/${experimentId}/confluence/${dataVersion}/cache.json`
      )
      .then(({ data }) => {
        coverage.ids = Object.keys(data.data);
        coverage.ids.forEach(id => {
          coverage.byId[id] = data.data[id];
        });
      })
      .catch();
  }

  return {
    coverage
  };
}
