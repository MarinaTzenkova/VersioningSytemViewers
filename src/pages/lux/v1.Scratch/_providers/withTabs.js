import { reactive, computed, ref, watch } from "@vue/composition-api";

export default function(version) {
  // TODO: removing brightield for now
  const tab = ref("Brightield");
  const tabs = reactive({
    names: [],
    active: computed(() => {
      return tab.value;
    })
  });

  watch(
    () => version,
    ({ algorithms, selected }) => {
      if (!tabs.names.includes("Brightfield")) tabs.names.push("Brightfield");

      if (algorithms.confluence && !tabs.names.includes("Confluence")) {
        tabs.names.push("Confluence");
      }
      // TODO: add scratch
      if (algorithms.scratch && !tabs.names.includes("Scratch")) {
        tabs.names.push("Scratch");
      }

      if (selected.confluence != "" && selected.scratch != "") {
        setTab("Brightfield");
      } else if (selected.confluence != "") {
        setTab("Confluence");
      } else setTab("Scratch");
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
