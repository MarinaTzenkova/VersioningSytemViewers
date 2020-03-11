<template>
  <div>{{ coverage }}</div>
</template>

<script>
import { inject } from "@vue/composition-api";
export default {
  setup() {
    const { coverage } = inject("data");
    return {
      coverage
    };
  }
};
</script>
