import { reactive, watch } from "@vue/composition-api";
import axios from "axios";
// this component needs to handle if a specific
//version per algorithm has been selected or if latest and apply it for all available algorithms,
//so maybe latest can move out in a more upper layer than algorithm specific?
export default function(experimentId, version, endpoint) {
  const versionOfData = reactive({
    selected: {
      confluence: "",
      scratch: ""
    },
    algorithms: {
      confluence: false,
      scratch: false
    }
  });
  watch(
    () => version,
    passedVersion => {
      if (passedVersion) {
        if (passedVersion.includes("conf")) {
          versionOfData.selected.confluence = passedVersion;
          versionOfData.algorithms.confluence = true;
        } else {
          versionOfData.selected.scratch = passedVersion;
          versionOfData.algorithms.scratch = true;
        }
      } else {
        fetchLatestConfluence();
        fetchLatestScratch();
      }
    },
    { immediate: true }
  );

  function fetchLatestConfluence() {
    axios
      .get(`${endpoint.lux2CacheBlob}${experimentId}/confluence/latest.json`)
      .then(({ data }) => {
        versionOfData.algorithms.confluence = true;
        versionOfData.selected.confluence = data.data[experimentId]["latest"];
        // maybe there should be a smarter way of telling which algorithms
        // are being used, maybe when scans json is created and the algorithms
        // go in the versioning
      })
      .catch(e => {
        console.log(e);
      });
  }

  function fetchLatestScratch() {
    axios
      .get(`${endpoint.lux2CacheBlob}${experimentId}/scratch/latest.json`)
      .then(({ data }) => {
        versionOfData.algorithms.scratch = true;
        versionOfData.selected.scratch = data.data[experimentId]["latest"];
      })
      .catch(e => {
        console.log(e);
      });
  }

  return {
    versionOfData
  };
}
