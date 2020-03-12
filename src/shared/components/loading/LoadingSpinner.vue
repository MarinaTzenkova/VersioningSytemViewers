<template>
  <div
    :style="{ height: height, width: width }"
    class="spinner border-8 border-blue-500"
  ></div>
</template>

<script>
export default {
  props: {
    height: { type: String, required: false, default: "40px" },
    width: { type: String, required: false, default: "40px" }
  }
};
</script>

<style lang="scss" scoped>
.spinner {
  animation: rotate 0.8s infinite linear;
  border-right-color: transparent;
  border-radius: 50%;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
