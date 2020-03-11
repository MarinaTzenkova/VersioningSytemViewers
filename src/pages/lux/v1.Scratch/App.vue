<template>
  <!-- base layout, wrapper loading -->
  <div>
    <div>{{ versionOfData }}</div>
    <div>{{ coverage }}</div>
    <div>{{ images }}</div>
  </div>
</template>

<script>
import setup from "./_providers/setup";
export default {
  props: {
    experimentId: { type: String, required: true }
  },
  setup(props, { root }) {
    const version = root.$route.query.version;
    const { versionOfData, coverage, images } = setup(
      props.experimentId,
      version
    );

    //compute images per algorithm based on version or latest ?

    return { versionOfData, coverage, images };
  }
};
</script>
