import { reactive, watch } from "@vue/composition-api";
export default function(timepoints) {
  const temperature = reactive({
    byId: {}
  });

  watch(
    () => timepoints,
    ({ data }) => {
      temperature.byId = data;
    },
    { deep: true }
  );

  return {
    temperature
  };
}
