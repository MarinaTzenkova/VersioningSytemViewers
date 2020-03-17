import { reactive, watch, ref } from "@vue/composition-api";
export default function(experimentId, version, timepoints, endpoint) {
  const images = reactive({
    urls: [],
    imageSize: ref([])
  });

  watch(
    () => ({
      fetched: timepoints.fetched,
      confluence: version.selected.Confluence,
      scratch: version.selected.Scratch
    }),
    ({ fetched, confluence, scratch }) => {
      scratch;
      if (fetched) {
        const temp = [];
        timepoints.ids.forEach((id, index) => {
          temp[index] = {};
          temp[
            index
          ].Brightfield = `${endpoint.lux2InputBlob}${experimentId}/brightfield/${id}.jpg`;
          temp[
            index
          ].Red = `${endpoint.lux2InputBlob}${experimentId}/red/${id}.jpg`;
          temp[
            index
          ].Green = `${endpoint.lux2InputBlob}${experimentId}/green/${id}.jpg`;
          if (confluence) {
            temp[
              index
            ].Confluence = `${endpoint.lux2DataBlob}${experimentId}/confluence/${confluence}/images/${id}.jpg`;
          }
          if (scratch) {
            temp[
              index
            ].Scratch = `${endpoint.lux2DataBlob}${experimentId}/scratch/${scratch}/images/${id}.jpg`;
          }
        });
        images.urls = temp;
      }
    },
    { deep: true }
  );

  return {
    images
  };
}
