import { reactive, watch } from "@vue/composition-api";
import axios from "axios";
export default function(experimentId, version) {
  const versionOfData = reactive({
    selected: ""
  });
  watch(
    () => version,
    passedVersion => {
      console.log(passedVersion);
      if (passedVersion) versionOfData.selected = passedVersion;
      else {
        fetchLatest();
      }
    },
    { immediate: true }
  );

  function fetchLatest() {
    axios
      .get(
        `http://127.0.0.1:10000/devstoreaccount1/cache/${experimentId}/confluence/latest.json`
      )
      .then(({ data }) => {
        versionOfData.selected = data.data[experimentId]["latest"];
      })
      .catch(e => {
        console.log(e);
      });
  }

  return {
    versionOfData
  };
}
