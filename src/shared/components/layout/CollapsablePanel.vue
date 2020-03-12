<template>
  <div class="mb-2">
    <div
      class="panel-head panel-head-blue cursor-pointer select-none hover:bg-blue-800 flex justify-between items-center"
      @click="collapse"
    >
      <slot name="head" />
      <i
        v-if="collapsable"
        class="fa"
        :class="{ 'fa-chevron-down': show, 'fa-chevron-right': !show }"
      ></i>
    </div>
    <div
      v-show="show"
      class="panel-body panel-body-blue"
      :class="{ 'panel-end': !hasFooter }"
    >
      <slot name="body" />
    </div>
    <div v-show="show && hasFooter" class="panel-end panel-end-blue">
      <slot name="footer" />
    </div>
  </div>
</template>
<script>
/**
 * Panel component that can collapse and expand content
 * @vue-prop {Boolean} [default=""] If inital state is expanded or not
 */
export default {
  props: {
    default: {
      type: Boolean,
      default: true
    },
    collapsable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: this.default
    };
  },
  computed: {
    hasFooter() {
      return "footer" in this.$slots;
    }
  },
  methods: {
    collapse() {
      if (this.collapsable) this.show = !this.show;
    }
  }
};
</script>
