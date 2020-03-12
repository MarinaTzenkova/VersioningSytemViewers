import { reactive, computed, ref, watch } from "@vue/composition-api";

export default function(version) {
  // TODO: removing brightield for now
  const tab = ref("Confluence");
  const tabs = reactive({
    names: [],
    active: computed(() => {
      return tab.value;
    })
  });

  watch(
    () => version,
    ({ algorithms }) => {
      // tabs.names.push("Brightfield");

      if (algorithms.confluence) {
        tabs.names.push("Confluence");
      }
      // TODO: add scratch
      // if (algorithms.scratch) tabs.names.push("Scratch");
    },
    { deep: true, immediate: true }
  );

  function setTab(t) {
    tab.value = t;
  }

  return {
    tabs,
    setTab
  };
}
