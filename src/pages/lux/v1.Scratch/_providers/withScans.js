import { reactive, computed, ref, watch } from "@vue/composition-api";
import axios from "axios";
export default function(experimentId, endpoint) {
  const timepoint = ref("");
  const timepoints = reactive({
    all: [],
    data: {},
    fetched: ref(false),
    active: computed(() => {
      return timepoint.value;
    })
  });

  watch(
    () => experimentId,
    experimentId => {
      fetchTimepointsAndTemperature(experimentId);
    },
    { immediate: true }
  );

  function setTimepoint(t) {
    timepoint.value = t;
  }

  function fetchTimepointsAndTemperature(experimentId) {
    axios
      .get(`${endpoint.lux2DataBlob}${experimentId}/scans.json`)
      .then(({ data }) => {
        timepoints.all = Object.keys(data.data);
        timepoints.all.forEach(timepoint => {
          timepoints.data[timepoint] = data.data[timepoint];
        });

        timepoint.value = timepoints.all[0];
        timepoints.fetched = true;
      })
      .catch();
  }

  return {
    timepoints,
    setTimepoint
  };
}
