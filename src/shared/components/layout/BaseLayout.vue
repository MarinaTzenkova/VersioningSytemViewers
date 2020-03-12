<template>
  <div class="mb-16">
    <nav-bar />
    <div class="mb-4"></div>
    <slot></slot>
  </div>
</template>

<script>
import NavBar from "@/shared/components/navigation/NavBar/index.vue";
export default {
  components: { NavBar }
};
</script>
