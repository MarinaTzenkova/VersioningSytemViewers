import { reactive, watch } from "@vue/composition-api";
import axios from "axios";
export default function(experimentId, version, endpoint) {
  const metadata = reactive({
    confluence: {
      timestamp: "",
      settings: {}
    },
    scratch: {
      timestamp: "",
      settings: {}
    }
  });

  watch(
    () => ({ selected: version.selected }),
    ({ selected }) => {
      if (selected.confluence) {
        fetchConfluenceMetadata();
      }
      if (selected.scratch) {
        fetchScratchMetadata();
      }
    },
    { deep: true }
  );

  function fetchConfluenceMetadata() {
    axios
      .get(
        `${endpoint.lux2DataBlob}${experimentId}/confluence/${version.selected.confluence}/metadata.json`
      )
      .then(({ data }) => {
        // data format should be changed from metadata file
        const settingVersion = version.selected.confluence.split(".")[1];
        // console.log(data);
        metadata.confluence.timestamp = data["timestamp"];
        metadata.confluence.settings = data["settings"][settingVersion];
      })
      .catch();
  }

  function fetchScratchMetadata() {
    axios
      .get()
      .then()
      .catch();
  }
  return {
    metadata
  };
}
