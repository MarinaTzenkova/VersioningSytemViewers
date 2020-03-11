<template>
  <div>
    <div>Used settings: {{ settings }}</div>
    <div>Created at: {{ timestamp }}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Object, required: true, default: () => {} }
  },
  computed: {
    settings() {
      return Object.values(this.data.settings)[0];
    },
    timestamp() {
      return new Date(this.data.timestamp * 1000).toLocaleString();
    }
  }
};
</script>

<style></style>
