import { reactive, computed } from "@vue/composition-api";
export default function(experimentId, version, coverage) {
  const images = reactive({
    urls: {
      confluence: computed(() => {
        const imgs = [];
        if (coverage) {
          coverage.ids.forEach(id => {
            imgs.push(
              `${experimentId}/confluence/${version.selected}/images/${id}.jpg`
            );
          });
          return imgs;
        }
      })
    }
  });

  return {
    images
  };
}
