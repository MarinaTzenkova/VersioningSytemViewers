import { reactive, computed } from "@vue/composition-api";

export default function(index, indices) {
  const buffer = reactive({
    prev: computed(() => {
      return index === 0 ? indices.value.length - 1 : index - 1;
    }),
    next: computed(() => {
      return index === indices.value.length - 1 ? 0 : index + 1;
    })
  });

  return {
    buffer
  };
}
