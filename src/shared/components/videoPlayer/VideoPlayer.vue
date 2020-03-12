<template>
  <div>
    <collapsable-panel :custom-class="'rounded-tl-none'" :collapsable="false">
      <template v-slot:head
        >Video
        <speed-slider @speed-changed="speedChanged" />
        <slot name="head" />
      </template>
      <template v-slot:body>
        <div
          v-if="!images.length"
          class="flex justify-center items-center h-80 py-16"
        >
          <!-- <loading-spinner /> -->
        </div>
        <div
          v-if="images.length"
          id="image-container"
          ref="image-container"
          class="relative flex justify-center align-center"
        >
          <img
            v-if="buffer.prev !== index"
            :key="`${buffer.prev}-buffer-prev`"
            class="absolute"
            :style="{ zIndex: '-1' }"
            :src="images[buffer.prev]"
          />
          <img
            v-if="buffer.next !== index"
            :key="`${buffer.next}-buffer-next`"
            ref="next-image"
            class="absolute"
            :style="{ zIndex: '-1' }"
            :src="images[buffer.next]"
          />
          <img
            :key="`${index}-image`"
            ref="current-image"
            :src="images[index]"
          />
          <!-- <div
            class="absolute top-0 left-0 mt-4 ml-4 bg-white px-3 py-2 font-semibold rounded cursor-pointer hover:bg-grey-lightest border-2 border-grey"
            @click="openImage"
          >
            <i class="mr-1 text-grey-darkest fa fa-external-link-square"></i>
            Open image in new tab
          </div> -->
        </div>
        <slot name="controls">
          <div v-if="images.length > 1" class="mt-3">
            <video-controls
              :is-playing="isPlaying"
              :index="index"
              :indices="indices"
              @startPlaying="startPlaying"
              @pause="pause"
              @nextImage="nextImage"
              @previousImage="previousImage"
              @indexChanged="setIndex"
            />
          </div>
        </slot>
      </template>
      <template v-slot:footer>
        <slot name="footer" />
      </template>
    </collapsable-panel>
  </div>
</template>

<script>
import CollapsablePanel from "@/shared/components/layout/CollapsablePanel";
// import LoadingSpinner from "@/shared/components/loading/LoadingSpinner.vue";
import VideoControls from "./VideoPlayerControls.vue";
import { ref, computed, watch } from "@vue/composition-api";
import SpeedSlider from "./SpeedSlider.vue";
export default {
  components: {
    CollapsablePanel,
    SpeedSlider,
    // LoadingSpinner,
    VideoControls
  },
  props: {
    images: { type: Array, default: () => [] },
    index: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit, refs }) {
    const speed = ref(0);
    const isPlaying = ref(false);
    const videoTimeoutReference = ref(0);

    const indices = computed(() =>
      new Array(props.images.length).fill().map((img, i) => i)
    );

    const buffer = computed(() => {
      let prev = 0;
      let next = 0;

      prev = props.index === 0 ? indices.value.length - 1 : props.index - 1;
      next = props.index === indices.value.length - 1 ? 0 : props.index + 1;
      return { prev, next };
    });

    watch(
      () => ({ value: speed.value }),
      ({ value }) => {
        value;
        if (isPlaying.value) {
          clearInterval(videoTimeoutReference.value);
          startPlaying();
        }
      }
    );

    function setIndex(val) {
      emit("indexChanged", val);
    }

    function speedChanged(val) {
      speed.value = val;
    }

    function nextImage() {
      setIndex(buffer.value.next);
    }

    function previousImage() {
      setIndex(buffer.value.prev);
    }

    function startPlaying() {
      isPlaying.value = true;
      if (buffer.value.next === 0) {
        nextImage();
      }

      videoTimeoutReference.value = setInterval(() => {
        play();
      }, speed.value);
    }

    function play() {
      if (buffer.value.next !== 0) {
        if (refs["next-image"].complete && refs["current-image"].complete)
          nextImage();
      } else {
        pause();
      }
    }

    function pause() {
      isPlaying.value = false;
      clearInterval(videoTimeoutReference.value);
    }

    function openImage() {}

    return {
      speed,
      isPlaying,
      videoTimeoutReference,
      indices,
      buffer,
      speedChanged,
      nextImage,
      previousImage,
      openImage,
      startPlaying,
      pause,
      setIndex
    };
  }
};
</script>

<style lang="scss" scoped>
#image-container {
  background-color: black;
  height: 535px;

  & > img {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
}
</style>
