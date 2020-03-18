import { reactive, watch } from "@vue/composition-api";
import Axios from "axios";
import Vue from "vue";

export default function(experimentId, verisons, endpoint) {
  const metadata = reactive({
    ids: [],
    byId: {},
    fetched: false
  });

  watch(
    () => verisons,
    ({ ids, fetched }) => {
      if (fetched) {
        ids.forEach(id => {
          metadata.ids = ids;
          fetchMetadata(id);
        });
        metadata.fetched = true;
      }
    },
    { deep: true }
  );

  function fetchMetadata(id) {
    const type = id.includes("conf") ? "confluence" : "scratch";
    Axios.get(
      `${endpoint.lux2DataBlob}${experimentId}/${type}/${id}/metadata.json`
    ).then(({ data }) => {
      Vue.set(metadata.byId, id, data);
    });
  }

  return {
    metadata
  };
}
