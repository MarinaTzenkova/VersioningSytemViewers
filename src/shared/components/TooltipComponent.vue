<template>
  <transition v-if="show" name="fade">
    <!-- class="relative w-0 h-0 -->
    <div>
      <div
        class="flex flex-wrap w-48 absolute bg-white rounded border border-gray-200 py-2 px-3"
        style="left: -20px; top: 5px;"
      >
        <p class="tooltip-header flex flex-wrap text-sm text-center">
          {{ tooltipHeader }}
        </p>
      </div>
    </div>
    <slot />
  </transition>
</template>
<script>
export default {
  props: {
    show: Boolean,
    tooltipHeader: { type: String, default: "" }
  }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
