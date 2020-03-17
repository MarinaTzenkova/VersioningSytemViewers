import { watch, reactive } from "@vue/composition-api";
import axios from "axios";
export default function(experimentId, endpoint) {
  const input = reactive({
    algorithms: {},
    channels: {},
    fetched: false
  });

  watch(
    () => experimentId,
    experimentId => {
      fetchInputMetadata(experimentId);
    },
    { immediate: true }
  );

  function fetchInputMetadata(experimentId) {
    axios
      .get(`${endpoint.lux2InputBlob}${experimentId}/metadata.json`)
      .then(({ data }) => {
        data.data["algorithms"].forEach(algorithm => {
          const upper = algorithm.charAt(0).toUpperCase() + algorithm.slice(1);
          input.algorithms[upper] = true;
        });

        data.data["channels"].forEach(channel => {
          const upper = channel.charAt(0).toUpperCase() + channel.slice(1);
          input.channels[upper] = true;
        });
        input.fetched = true;
      })
      .catch();
  }

  return {
    input
  };
}
