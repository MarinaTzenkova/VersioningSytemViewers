import { reactive, watch } from "@vue/composition-api";
export default function(experimentId, version, timepoints, endpoint) {
  const images = reactive({
    urls: {
      Confluence: [],
      Brightfield: [],
      Scratch: []
    }
  });

  watch(
    () => ({ all: timepoints.all }),
    ({ all }) => {
      if (all) {
        all.forEach(id => {
          images.urls.Brightfield.push(
            `${endpoint.lux2DataBlob}${experimentId}/original/default/images/${id}.jpg`
          );
        });
      }
    },
    { deep: true }
  );

  watch(
    () => ({ all: timepoints.all, confluence: version.selected.confluence }),
    ({ all, confluence }) => {
      if (all && confluence) {
        all.forEach(id => {
          // TODO: check if algorithm is passed
          // TODO: update input version
          images.urls.Confluence.push(
            `${endpoint.lux2DataBlob}${experimentId}/confluence/${confluence}/images/${id}.jpg`
          );
        });
      }
    },
    { deep: true }
  );

  watch(
    () => ({ all: timepoints.all, scratch: version.selected.scratch }),
    ({ all, scratch }) => {
      if (all && scratch) {
        all.forEach(id => {
          images.urls.Scratch.push(
            `${endpoint.lux2DataBlob}${experimentId}/scratch/${scratch}/images/${id}.jpg`
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
