<template>
  <div id="tabs" class="flex px-1">
    <div
      v-for="t in tabs"
      :key="t"
      :class="{ tab: true, 'tab-blue': t === tab, 'tab-white': t !== tab }"
      @click="setTab(t)"
    >
      {{ t }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tab: {
      type: String,
      required: true
    },
    tabs: {
      type: Array,
      required: true
    }
  },
  methods: {
    setTab(t) {
      this.$emit("onChange", t);
    }
  }
};
</script>
