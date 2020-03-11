<script>
import axios from "axios";
export default {
  props: {
    experimentId: { type: String, required: true },
    version: { type: String, required: false }
  },
  data() {
    return {
      timepoints: [],
      coverage: {},
      images: {}
    };
  },
  beforeMount() {}
};
</script>

<style></style>
