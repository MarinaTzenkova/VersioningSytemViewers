<script>
export default {
  props: {
    do: {
      type: Function,
      required: true
    }
  },
  mounted() {
    const listener = e => {
      if (e.target === this.$el || this.$el.contains(e.target)) {
        return;
      }
      this.do();
    };
    document.addEventListener("click", listener, true);
    this.$once("hook:beforeDestroy", () => {
      document.removeEventListener("click", listener, true);
    });
  },
  render() {
    return this.$slots.default[0];
  }
};
</script>
