import { reactive } from "@vue/composition-api";

export default function(speed, buffer) {
  const controls = reactive({
    isPlaying: false,
    videoTimeoutReference: 0
  });

  function startPlaying(nextImage, cacheChannels) {
    controls.isPlaying = true;
    if (buffer.next === 0) {
      nextImage();
    }

    controls.videoTimeoutReference = setInterval(() => {
      play(nextImage, cacheChannels);
    }, speed.value);
  }

  function play(nextImage, cacheChannels) {
    if (buffer.next !== 0) {
      cacheChannels().then(() => {
        nextImage();
      });
    } else {
      pause();
    }
  }

  function pause() {
    controls.isPlaying = false;
    clearInterval(controls.videoTimeoutReference);
  }
  return { controls, startPlaying, pause };
}
