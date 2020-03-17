import { reactive, ref } from "@vue/composition-api";

export default function() {
  const settings = reactive({
    brightfieldOptions: {
      show: ref(true)
    },
    greenOptions: {
      show: true,
      threshold: 0.1,
      brightness: 0,
      contrast: 1,
      hue: 2 / 7
    },
    redOptions: {
      show: true,
      threshold: 0.1,
      brightness: 0,
      contrast: 1,
      hue: 0
    },
    confluenceOptions: {
      show: true,
      threshold: 0.68,
      brightness: 1.0,
      contrast: 1,
      hue: 2 / 7
    }
    // scratchOptions: {
    //   show: true
    // }
  });

  // TODO:
  function saveOptions(options) {
    options;
  }

  function loadSettings(experimentId, version, channels) {
    version;
    channels;
  }

  return {
    settings,
    saveOptions,
    loadSettings
  };
}
