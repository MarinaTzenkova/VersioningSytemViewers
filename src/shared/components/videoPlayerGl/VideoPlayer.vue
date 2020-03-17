<template>
  <div class="flex flex-col lg:flex-row w-full">
    <div class="w-full lg:w-4/6">
      <collapsable-panel :custom-class="'rounded-tl-none'" :collapsable="false">
        <template v-slot:head>
          Video
          <speed-slider @speed-changed="speedChanged" />
          <slot name="head" />
        </template>
        <template #body>
          <div
            v-if="render"
            id="image-container"
            ref="image-container"
            class="flex justify-center align-center relative"
          >
            <video-display
              :images="imageElements"
              :size="imageSize"
              :red-options="channelSettings.redOptions"
              :green-options="channelSettings.greenOptions"
              :confluence-options="channelSettings.confluenceOptions"
              :base-options="channelSettings.brightfieldOptions"
            />
            <!-- :scratch-options="scratchOptions" -->
          </div>
          <div v-else class="flex justify-center items-center h-80 py-16">
            KURA MI QJ
          </div>

          <div v-if="images.length > 1" class="mt-3">
            <video-controls
              :is-playing="isPlaying"
              :index="index"
              :indices="indices"
              @nextImage="nextImage"
              @previousImage="previousImage"
              @startPlaying="startPlaying"
              @pause="pause"
              @indexChanged="setIndex"
            />
          </div>
        </template>
        <template v-slot:footer>
          <slot name="footer" />
        </template>
      </collapsable-panel>
    </div>
    <div class="w-full lg:w-2/6 ml-0 lg:ml-2">
      <slot name="sidebar" />
    </div>
  </div>
</template>

<script>
import { loadImage, createImage } from "@/shared/utils";

import CollapsablePanel from "@/shared/components/layout/CollapsablePanel";
import VideoControls from "@/shared/components/videoPlayer/VideoPlayerControls.vue";
import SpeedSlider from "@/shared/components/videoPlayer/SpeedSlider.vue";
import VideoDisplay from "./VIdeoDisplay.vue";
// import LoadingSpinner from "@/shared/components/loading/LoadingSpinner.vue";

export default {
  components: {
    CollapsablePanel,
    VideoControls,
    SpeedSlider,
    VideoDisplay
    // LoadingSpinner
  },
  props: {
    images: { type: Array, required: true },
    index: { type: Number, required: true },
    channels: { type: Object, required: true },
    channelSettings: { type: Object, required: true },
    tab: { type: String, required: true },
    imageSize: { type: Array, required: true }
  },
  data() {
    return {
      bSelected: true,
      isPlaying: false,
      videoTimeoutReference: 0,
      speed: 0,
      imageElements: {
        Base: null,
        Red: null,
        Green: null,
        Confluence: null,
        Scratch: null
      },
      render: false
    };
  },
  computed: {
    buffer() {
      let prev = 0;
      let next = 0;

      prev = this.prevIndex();
      next = this.nextIndex();
      return { prev, next };
    },
    indices() {
      return Object.keys(this.images);
    }
  },
  watch: {
    channels: {
      handler() {
        if (this.images.length > 0) {
          this.getImg();
        }
      },
      deep: true
    },
    images() {
      if (this.images.length > 0) {
        this.createImages().then(() => {
          this.render = true;
          this.cacheChannels().then(() => {
            this.getImg();
          });
        });
      }
    },
    index() {
      this.cacheChannels().then(() => {
        this.getImg();
      });
    },
    speed() {
      if (this.isPlaying) {
        clearInterval(this.videoTimeoutReference);
        this.startPlaying();
      }
    }
  },
  methods: {
    getImg() {
      this.getIndexImages().then(r => {
        this.imageElements = r;
      });
    },
    cacheChannels() {
      const reqs = [];
      const chKeys = Object.keys(this.channels);
      chKeys.forEach(channel => {
        if (this.buffer.prev !== this.index) {
          loadImage(this.images[this.buffer.prev][channel])
            .then(data => {
              reqs.push(data);
            })
            .catch(() => {
              reqs.push(this.blank);
            });
        }
        if (this.buffer.next !== this.index) {
          loadImage(this.images[this.buffer.next][channel])
            .then(data => {
              reqs.push(data);
            })
            .catch(() => {
              reqs.push(this.blank);
            });
        }
      });
      return Promise.all(reqs);
    },
    startPlaying() {
      this.isPlaying = true;
      if (this.buffer.next === 0) {
        this.nextImage();
      }
      this.videoTimeoutReference = setInterval(() => {
        this.play();
      }, this.speed);
    },
    play() {
      if (this.buffer.next !== 0) {
        this.cacheChannels().then(() => {
          this.nextImage();
        });
      } else {
        this.pause();
      }
    },
    nextImage() {
      this.setIndex(this.buffer.next);
    },
    previousImage() {
      this.setIndex(this.buffer.prev);
    },
    setIndex(val) {
      console.log(val);
      this.$emit("indexChanged", +val);
    },
    prevIndex(index = this.index) {
      return index === 0 ? this.images.length - 1 : index - 1;
    },
    nextIndex(index = this.index) {
      return index === this.images.length - 1 ? 0 : index + 1;
    },
    getIndexImages() {
      return new Promise(res => {
        const chKeys = Object.keys(this.channels);
        const resp = {};
        const resolve = () => {
          if (Object.keys(resp).length === 5) res(resp);
        };

        chKeys.forEach(k => {
          if (this.channels[k]) {
            loadImage(this.images[this.index][k])
              .then(data => {
                resp[k] = data;
              })
              .catch(() => {
                resp[k] = this.blank;
              })
              .finally(() => {
                resolve();
              });
          } else {
            resp[k] = this.blank;
            resolve();
          }
        });
      });
    },
    pause() {
      this.isPlaying = false;
      clearInterval(this.videoTimeoutReference);
    },
    speedChanged(val) {
      this.speed = val;
    },
    createImages() {
      return new Promise(res => {
        this.blank = createImage(this.imageSize, [0, 0, 0, 0]);
        this.imageElements = {
          Base: this.blank,
          Red: this.blank,
          Green: this.blank,
          Confluence: this.blank,
          Scratch: this.blank
        };
        res();
      });
    }
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
.settings {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  grid-column-gap: 0.5em;
  grid-row-gap: 0.5em;
}
</style>
