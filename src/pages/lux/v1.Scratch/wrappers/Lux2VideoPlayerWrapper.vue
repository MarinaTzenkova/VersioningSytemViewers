<template>
  <div>{{ images }}</div>
</template>

<script>
import { inject } from "@vue/composition-api";
export default {
  setup() {
    const { images } = inject("data");
    return {
      images
    };
  }
};
</script>
