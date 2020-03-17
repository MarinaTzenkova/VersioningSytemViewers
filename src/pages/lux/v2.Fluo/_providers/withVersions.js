import { reactive, watch } from "@vue/composition-api";
import axios from "axios";
export default function(experimentId, input, metadata) {
  const versions = reactive({
    Red: "",
    Green: "",
    Confluence: "",
    Scratch: ""
  });

  watch(
    () => ({
      fetched: input.fetched,
      algorithms: input.algorithms,
      channels: input.channels,
      metadata: metadata
    }),
    ({ fetched, algorithms, channels, metadata }) => {
      if (fetched) {
        Object.keys(algorithms).forEach(key => {
          if (algorithms[key]) {
            versions[key] = metadata[key].version;
          }
        });
        Object.keys(channels).forEach(key => {
          if (channels[key] && key !== "Brightfield") {
            fetchLatestVersionForChannel(key);
          }
        });
      }
    },
    { deep: true }
  );

  // TODO:
  function fetchLatestVersionForChannel(channel) {
    channel;
    axios.get();
  }

  return {
    versions
  };
}
