import { reactive, watch } from "@vue/composition-api";

export default function(input, tabs) {
  const channels = reactive({
    overlays: {
      Brightfield: false,
      Red: false,
      Green: false,
      Confluence: false,
      Scratch: false
    }
  });

  watch(
    () => ({ inputChannels: input.channels, fetched: input.fetched }),
    ({ inputChannels, fetched }) => {
      if (fetched) {
        Object.keys(inputChannels).forEach(key => {
          channels.overlays[key] = true;
        });
      }
    },
    { deep: true }
  );

  watch(
    () => ({ active: tabs.active }),
    ({ active }) => {
      if (active === "Confluence" || active === "Scratch") {
        channels.overlays.Confluence = false;
        channels.overlays.Scratch = false;
        channels.overlays[active] = true;
      } else {
        channels.overlays.Confluence = false;
        channels.overlays.Scratch = false;
      }
    },
    { deep: true, immediate: true }
  );

  return {
    channels
  };
}
