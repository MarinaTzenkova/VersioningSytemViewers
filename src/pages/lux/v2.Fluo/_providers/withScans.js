import { reactive, computed, ref, watch } from "@vue/composition-api";
import axios from "axios";
export default function(experimentId, endpoint) {
  const timepoint = ref("");
  const timepoints = reactive({
    ids: [],
    temperature: {},
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
    console.log(t);
    timepoint.value = t;
    console.log(timepoint.value, timepoints.active);
  }

  function fetchTimepointsAndTemperature(experimentId) {
    axios
      .get(`${endpoint.lux2InputBlob}${experimentId}/scans.json`)
      .then(({ data }) => {
        timepoints.ids = Object.keys(data.data);
        timepoints.ids.forEach(timepoint => {
          timepoints.temperature[timepoint] = data.data[timepoint].temperature;
        });

        timepoint.value = timepoints.ids[0];
        timepoints.fetched = true;
      })
      .catch();
  }

  return {
    timepoints,
    setTimepoint
  };
}
