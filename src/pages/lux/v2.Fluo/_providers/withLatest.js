import { reactive, watch } from "@vue/composition-api";
import axios from "axios";
// this component needs to handle if a specific
//version per algorithm has been selected or if latest and apply it for all available algorithms,
//so maybe latest can move out in a more upper layer than algorithm specific?
export default function(experimentId, version, endpoint, input) {
  const latestVersionOfProcessedData = reactive({
    selected: {
      Confluence: "",
      Scratch: ""
    },
    fetched: {
      Confluence: false,
      Scratch: false
    }
  });

  watch(
    () => ({
      version: version,
      algorithms: input.algorithms,
      fetched: input.fetched
    }),
    ({ version, algorithms, fetched }) => {
      if (fetched) {
        if (version) {
          if (version.includes("conf")) {
            latestVersionOfProcessedData.selected.Confluence = version;
            latestVersionOfProcessedData.fetched.Confluence = true;
          } else {
            latestVersionOfProcessedData.selected.Scratch = version;
            latestVersionOfProcessedData.fetched.Scratch = true;
          }
        } else {
          Object.keys(algorithms).forEach(algorithm => {
            fetchLatestForAlgorithm(algorithm);
          });
        }
      }
    },
    { deep: true }
  );

  function fetchLatestForAlgorithm(algorithm) {
    axios
      .get(
        `${
          endpoint.lux2CacheBlob
        }${experimentId}/${algorithm.toLowerCase()}/latest.json`
      )
      .then(({ data }) => {
        latestVersionOfProcessedData.selected[algorithm] =
          data.data[experimentId]["latest"];
        latestVersionOfProcessedData.fetched[algorithm] = true;
      })
      .catch(e => {
        console.log(e);
      });
  }

  return {
    latestVersionOfProcessedData
  };
}
