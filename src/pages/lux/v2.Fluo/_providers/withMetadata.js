import { reactive, watch } from "@vue/composition-api";
import axios from "axios";
export default function(experimentId, version, input, endpoint) {
  const metadata = reactive({
    Confluence: {
      timestamp: "",
      settings: ""
    },
    Scratch: {
      timestamp: "",
      settings: ""
    }
  });

  watch(
    () => ({ selected: version.selected, fetched: version.fetched }),
    ({ selected, fetched }) => {
      Object.keys(fetched).forEach(key => {
        if (fetched[key]) {
          fetchMetadataPerVersion(selected[key], key);
        }
      });
    },
    { deep: true }
  );

  function fetchMetadataPerVersion(v, key) {
    axios
      .get(
        `${
          endpoint.lux2DataBlob
        }${experimentId}/${key.toLowerCase()}/${v}/metadata.json`
      )
      .then(({ data }) => {
        // data format should be changed from metadata file
        const settingVersion = v.split(".")[1];
        metadata[key].timestamp = data["timestamp"];
        metadata[key].settings = data["settings"][settingVersion];
      })
      .catch();
  }

  return {
    metadata
  };
}
