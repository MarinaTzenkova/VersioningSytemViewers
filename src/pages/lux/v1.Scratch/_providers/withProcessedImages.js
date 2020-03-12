import { reactive, watch } from "@vue/composition-api";
export default function(experimentId, version, timepoints, endpoint) {
  const images = reactive({
    urls: {
      Confluence: [],
      Brightfield: []
    }
  });

  watch(
    () => ({ all: timepoints.all, selected: version.selected }),
    ({ all, selected }) => {
      if (all && selected) {
        all.forEach(id => {
          // TODO: check if algorithm is passed
          // TODO: update input version
          images.urls.Brightfield.push(
            `${endpoint.lux2DataBlob}${experimentId}/original/default/images/${id}.jpg`
          );
          images.urls.Confluence.push(
            `${endpoint.lux2DataBlob}${experimentId}/confluence/${selected}/images/${id}.jpg`
          );
        });
      }
    },
    { deep: true }
  );

  return {
    images
  };
}
