<template>
  <div class="flex flex-col lg:flex-row w-full">
    <div class="w-full lg:w-4/6">
      <collapsable-panel :collapsable="false">
        <template v-slot:head>
          Video
          <!-- <speed-slider @speed-changed="setSpeed" /> -->
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
            <!-- <video-controls
              :is-playing="controls.isPlaying"
              :index="index"
              :indices="indices"
              @startPlaying="startPlaying"
              @pause="pause"
              @nextImage="nextImage"
              @previousImage="previousImage"
              @indexChanged="setIndex"
            /> -->
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
import setup from "./_providers/setup";
import { computed, watch, ref, reactive } from "@vue/composition-api";
import { createImage, loadImage } from "@/shared/utils";
import VideoPlayerDisplay from "./VIdeoDisplay.vue";

// global components
import CollapsablePanel from "@/shared/components/layout/CollapsablePanel.vue";
// import SpeedSlider from "@/shared/components/videoPlayer/SpeedSlider.vue";
// import VideoControls from "@/shared/components/videoPlayer/VideoPlayerControls.vue";
export default {
  components: {
    CollapsablePanel,
    VideoPlayerDisplay
    // SpeedSlider,
    // VideoControls,
  },
  props: {
    images: { type: Object, required: false },
    index: { type: Number, required: false },
    channels: { type: Object, required: false },
    channelSettings: { type: Object, required: false },
    tab: { type: String, required: false },
    imageSize: { type: Array, required: false },
    fetching: { type: Object, required: false }
  },
  setup(props) {
    const indices = computed(() => Object.keys(props.images.urls));
    const chKeys = computed(() => Object.keys(props.channels.overlays));
    const blank = ref({});
    blank;
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
    const { buffer } = setup(props.index, indices);

    function cacheChannels() {
      const reqs = [];
      chKeys.value.forEach(channel => {
        if (buffer.prev !== props.index) {
          loadImage(props.images.urls[buffer.prev][channel])
            .then(r => {
              reqs.push(r);
            })
            .catch(() => {
              reqs.push(blank);
            });
        }
        if (buffer.next !== props.index) {
          loadImage(props.images.urls[buffer.next][channel])
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

    // function nextImage() {
    //   setIndex(buffer.value.next);
    // }

    // function previousImage() {
    //   setIndex(buffer.value.prev);
    // }

    // function setIndex(val) {
    //   emit("indexChanged", val);
    // }

    // watch(
    //   () => ({ value: speed }),
    //   ({ value }) => {
    //     value;
    //     if (controls.isPlaying) {
    //       clearInterval(controls.videoTimeoutReference);
    //       startPlaying(nextImage, cacheChannels);
    //     }
    //   }
    // );

    createImages();
    return {
      indices,
      imageElements,
      chKeys
      // setIndex,
      // nextImage,
      // previousImage,
      // buffer,
      // controls,
      // setSpeed,
      // startPlaying,
      // pause,
      // getIndexImages,
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
