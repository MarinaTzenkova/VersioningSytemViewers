import { reactive } from "@vue/composition-api";

export default function() {
  const controls = reactive({
    isPlaying: false,
    videoTimeoutReference: 0
  });

  function pause() {
    controls.isPlaying = false;
    clearInterval(controls.videoTimeoutReference);
  }
  return { controls, pause };
}
