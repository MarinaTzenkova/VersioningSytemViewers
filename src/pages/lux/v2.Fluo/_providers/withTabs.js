import { reactive, computed, ref, watch } from "@vue/composition-api";

export default function(version) {
  const tab = ref("Original");
  const tabs = reactive({
    names: [],
    active: computed(() => {
      return tab.value;
    })
  });

  watch(
    () => version,
    ({ fetched }) => {
      if (!tabs.names.includes("Original")) tabs.names.push("Original");
      Object.keys(fetched).forEach(key => {
        if (fetched[key]) {
          if (!tabs.names.includes(key)) tabs.names.push(key);
        }
      });
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
