<template>
  <div class="flex flex-col lg:flex-row w-full">
    <div class="w-full lg:w-4/6">
      <collapsable-panel :collapsable="false">
        <template v-slot:head>
          Video
          <speed-slider @speed-changed="setSpeed" />
          <slot name="head" />
        </template>
        <template #body>
          <div
            id="image-container"
            ref="image-container"
            class="flex justify-center align-center relative"
          >
            <video-player-display
              v-if="imageElements"
              :images="imageElements"
              :size="imageSize"
              :red-options="channelSettings.redOptions"
              :green-options="channelSettings.greenOptions"
              :confluence-options="channelSettings.confluenceOptions"
              :base-options="channelSettings.brightfieldOptions"
            />
          </div>
          <div class="mt-3">
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
        </template>
      </collapsable-panel>
    </div>
    <div class="w-full lg:w-2/6 ml-0 lg:ml-2">
      <slot name="sidebar" />
    </div>
  </div>
</template>

<script>
// import setup from "./_providers/setup";
import { computed, watch, ref, reactive } from "@vue/composition-api";
import { createImage, loadImage } from "@/shared/utils";
import VideoPlayerDisplay from "./VIdeoDisplay.vue";

// global components
import CollapsablePanel from "@/shared/components/layout/CollapsablePanel.vue";
import SpeedSlider from "@/shared/components/videoPlayer/SpeedSlider.vue";
import VideoControls from "@/shared/components/videoPlayer/VideoPlayerControls.vue";
export default {
  components: {
    CollapsablePanel,
    VideoPlayerDisplay,
    SpeedSlider,
    VideoControls
  },
  props: {
    images: { type: Object, required: false },
    index: { type: Number, required: false },
    channels: { type: Object, required: false },
    channelSettings: { type: Object, required: false },
    tab: { type: String, required: false },
    imageSize: { type: Array, required: false },
    fetching: { type: Object, required: false },
    indices: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const chKeys = computed(() => Object.keys(props.channels.overlays));
    const blank = ref({});
    const buffer = computed(() => {
      let prev = 0;
      let next = 0;

      prev = props.index === 0 ? props.indices.length - 1 : props.index - 1;
      next = props.index === props.indices.length - 1 ? 0 : props.index + 1;
      return { prev, next };
    });
    const speed = ref(0);
    const isPlaying = ref(false);
    const videoTimeoutReference = ref(0);

    const imageElements = reactive({
      Brightfield: null,
      Red: null,
      Green: null,
      Scratch: null,
      Confluence: null
    });
    watch(
      () => props.images,
      ({ urls }) => {
        if (urls) {
          createImages().then(() => {
            cacheChannels().then(() => {
              getImg();
            });
          });
        }
      },
      { deep: true }
    );

    watch(
      () => props.channels,
      ({ overlays }) => {
        overlays;
        if (props.images.urls) {
          getImg();
        }
      },
      { deep: true }
    );

    watch(
      () => ({ value: speed }),
      ({ value }) => {
        value;
        if (isPlaying.value) {
          clearInterval(videoTimeoutReference.value);
          startPlaying(nextImage, cacheChannels);
        }
      }
    );

    function setSpeed(val) {
      speed.value = val;
    }
    function pause() {
      isPlaying.value = false;
      clearInterval(videoTimeoutReference.value);
    }

    function cacheChannels() {
      const reqs = [];
      chKeys.value.forEach(channel => {
        if (buffer.value.prev !== props.index) {
          loadImage(props.images.urls[buffer.value.prev][channel])
            .then(r => {
              reqs.push(r);
            })
            .catch(() => {
              reqs.push(blank);
            });
        }
        if (buffer.value.next !== props.index) {
          loadImage(props.images.urls[buffer.value.next][channel])
            .then(r => {
              reqs.push(r);
            })
            .catch(() => {
              reqs.push(blank);
            });
        }
      });
      return Promise.all(reqs);
    }

    function createImages() {
      return new Promise(res => {
        blank.value = createImage(props.imageSize, [0, 0, 0, 0]);
        imageElements.Brightfield = blank.value;
        imageElements.Red = blank.value;
        imageElements.Green = blank.value;
        imageElements.Confluence = blank.value;
        imageElements.Scratch = blank.value;

        res();
      });
    }

    function getIndexImages() {
      return new Promise(res => {
        const resp = {};
        const resolve = () => {
          if (Object.keys(resp).length === 5) res(resp);
        };

        console.log(props.images.urls, props.index);
        chKeys.value.forEach(channel => {
          if (props.channels.overlays[channel]) {
            loadImage(props.images.urls[props.index][channel])
              .then(r => {
                resp[channel] = r;
              })
              .catch(() => {
                resp[channel] = blank.value;
              })
              .finally(() => {
                resolve();
              });
          } else {
            resp[channel] = blank.value;
            resolve();
          }
        });
      });
    }

    function getImg() {
      getIndexImages().then(r => {
        Object.keys(r).forEach(key => {
          imageElements[key] = r[key];
        });
      });
    }

    function nextImage() {
      setIndex(buffer.value.next);
    }

    function previousImage() {
      setIndex(buffer.value.prev);
    }

    function setIndex(val) {
      emit("indexChanged", val);
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
        cacheChannels().then(() => {
          nextImage();
        });
      } else {
        pause();
      }
    }

    createImages();
    return {
      imageElements,
      isPlaying,
      videoTimeoutReference,
      setSpeed,
      speed,
      startPlaying,
      pause,
      previousImage,
      setIndex,
      nextImage,
      chKeys,
      buffer
    };
  }
};
</script>

<style lang="scss" scoped>
#image-container {
  background-color: black;
  height: 480px;
  & > canvas {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
}
</style>
