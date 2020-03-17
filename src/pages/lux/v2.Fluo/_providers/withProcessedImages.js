import { reactive, watch, ref } from "@vue/composition-api";
export default function(experimentId, version, timepoints, endpoint) {
  const images = reactive({
    urls: [],
    imageSize: ref([])
  });

  watch(
    () => ({ fetched: timepoints.fetched }),
    ({ fetched }) => {
      if (fetched) {
        timepoints.ids.forEach((id, index) => {
          images.urls[index] = {};
          images.urls[
            index
          ].Brightfield = `${endpoint.lux2InputBlob}${experimentId}/brightfield/${id}.jpg`;
          images.urls[
            index
          ].Red = `${endpoint.lux2InputBlob}${experimentId}/red/${id}.jpg`;
          images.urls[
            index
          ].Green = `${endpoint.lux2InputBlob}${experimentId}/green/${id}.jpg`;
        });
      }
    },
    { deep: true }
  );

  watch(
    () => ({
      fetched: timepoints.fetched,
      confluence: version.selected.Confluence
    }),
    ({ fetched, confluence }) => {
      if (fetched && confluence) {
        timepoints.ids.forEach((id, index) => {
          images.urls[
            index
          ].Confluence = `${endpoint.lux2DataBlob}${experimentId}/confluence/${confluence}/images/${id}.jpg`;
        });
      }
    },
    { deep: true }
  );

  watch(
    () => ({
      fetched: timepoints.fetched,
      scratch: version.selected.Scratch
    }),
    ({ fetched, scratch }) => {
      if (fetched && scratch) {
        timepoints.ids.forEach((id, index) => {
          images.urls[
            index
          ].Scratch = `${endpoint.lux2DataBlob}${experimentId}/scratch/${scratch}/images/${id}.jpg`;
        });
      }
    },
    { deep: true }
  );

  return {
    images
  };
}
