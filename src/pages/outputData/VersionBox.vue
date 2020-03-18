<template>
  <div>
    <div>Settings: {{ data.settings }}</div>
    <div>Time of creation: {{ data.timestamp | datetime }}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>

<style></style>
