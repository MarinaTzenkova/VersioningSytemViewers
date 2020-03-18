import { reactive } from "@vue/composition-api";
import axios from "axios";

export default function(experimentId, endpoint) {
  const versions = reactive({
    ids: [],
    fetched: false
  });

  function fetchVersions() {
    axios
      .get(`${endpoint.lux2CacheBlob}${experimentId}/availableOutput.json`)
      .then(({ data }) => {
        versions.ids = data.data[experimentId];
        versions.fetched = true;
      });
  }

  return {
    versions,
    fetchVersions
  };
}
