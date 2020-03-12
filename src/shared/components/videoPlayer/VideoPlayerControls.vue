<template>
  <div class="flex items-center">
    <span
      v-show="!isPlaying"
      class="fa fa-play-circle-o text-5xl btn btn-blue"
      @click="startPlaying"
    ></span>
    <span
      v-show="isPlaying"
      class="fa fa-pause-circle-o text-5xl btn btn-blue"
      @click="pause"
    ></span>
    <div class="flex ml-1">
      <span
        class="fa fa-2x fa-arrow-circle-o-left btn btn-blue ml-1"
        @click="previousImage"
      ></span>
      <span
        class="fa fa-2x fa-arrow-circle-o-right btn btn-blue ml-1"
        @click="nextImage"
      ></span>
    </div>
    <div
      ref="video-slider"
      class="ml-3 rounded overflow-hidden cursor-pointer bg-gray-300 flex-grow h-5 shadow-inner"
      @mousedown="moveVideoSlider"
    >
      <div
        class="h-full bg-blue-600"
        :style="{ width: progressPercentage + '%' }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isPlaying: Boolean,
    index: {
      type: Number,
      required: true
    },
    indices: {
      type: Array,
      required: true
    }
  },
  computed: {
    progressPercentage() {
      const { index, indices } = this;
      return (index / (indices.length - 1)) * 100;
    },
    sliderPercentagesMap() {
      const { indices } = this;
      const map = {};
      const step = 50 / (indices.length - 1);
      let prev = 0;
      indices.forEach(s => {
        if (s === 0) {
          map[s] = [0, step];
          prev = step;
        } else if (s === indices.length - 1) {
          map[s] = [100 - step, 100];
        } else {
          map[s] = [prev, prev + step * 2];
          prev = prev + step * 2;
        }
      });
      return map;
    }
  },
  methods: {
    startPlaying() {
      this.$emit("startPlaying");
    },
    nextImage() {
      this.$emit("nextImage");
    },
    previousImage() {
      this.$emit("previousImage");
    },
    pause() {
      this.$emit("pause");
    },

    moveVideoSlider(event) {
      const { indices } = this;
      const { offsetLeft, offsetWidth } = this.$refs["video-slider"];

      const x = Math.round(((event.clientX - offsetLeft) / offsetWidth) * 100);

      const map = this.sliderPercentagesMap;
      indices.forEach(s => {
        if (map[s][0] < x && x <= map[s][1]) {
          this.$emit("indexChanged", s);
          return null;
        }
      });
    }
  }
};
</script>
