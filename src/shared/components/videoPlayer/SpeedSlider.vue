<template>
  <div class="flex items-center">
    <img class="h-6 mx-3" src="@/shared/images/turtle.png" alt="turtle-icon" />
    <div
      ref="slider"
      class="relative rounded bg-gray-200 w-48 h-5 shadow-inner"
      @click="setSpeed"
    >
      <div id="speed-slider-base">
        <div id="speed-slider-origin" :style="{ left: speedPercentage + '%' }">
          <div id="speed-slider-knob" @mousedown="startDrag"></div>
        </div>
      </div>
    </div>
    <img
      class="h-6 mx-3"
      src="@/shared/images/cheetah.png"
      alt="cheetah-icon"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      speedPercentage: 0,
      isDragging: false,
      sliderPos: 0,
      sliderWidth: 0,
      minTime: 50,
      maxTime: 1000
    };
  },
  watch: {
    speedPercentage(p) {
      const minTime = this.minTime;
      const maxTime = this.maxTime;
      const speed = maxTime - Math.floor((p / 100) * (maxTime - minTime));
      this.$emit("speed-changed", speed);
    }
  },
  mounted() {
    window.addEventListener("mouseup", this.endDrag);
    this.speedPercentage = 50;
  },
  methods: {
    startDrag() {
      const rect = this.$refs.slider.getBoundingClientRect();
      this.sliderPos = rect.left;
      this.sliderWidth = rect.width;
      window.addEventListener("mousemove", this.drag);
    },
    endDrag() {
      this.isDragging = false;
      window.removeEventListener("mousemove", this.drag);
    },
    drag(event) {
      let pos = event.clientX - this.sliderPos;
      // Clamps the position value between 0 and the slider width
      pos = pos < 0 ? 0 : pos > this.sliderWidth ? this.sliderWidth : pos;

      this.speedPercentage = Math.floor((pos / this.sliderWidth) * 100);
    },
    setSpeed(event) {
      const { offsetLeft, offsetWidth } = this.$refs.slider;
      this.speedPercentage = Math.round(
        ((event.clientX - offsetLeft) / offsetWidth) * 100
      );
    }
  }
};
</script>

<style lang="scss" scoped>
#speed-slider-base {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  transform: translate3d(0, 0, 0);
  user-select: none;

  & /deep/ #speed-slider-origin {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 2px;
    // transition: 50ms;
  }

  & /deep/ #speed-slider-knob {
    width: 34px;
    height: 28px;
    left: -17px;
    top: -6px;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    background: #fff;
    cursor: pointer;
    box-shadow: inset 0 0 1px #fff, inset 0 1px 7px #ebebeb, 0 3px 6px -3px #bbb;
    transform: translate3d(0, 0, 0);
    position: relative;
    z-index: 1;

    &:before {
      content: "";
      display: block;
      position: absolute;
      height: 14px;
      width: 1px;
      background: #e8e7e6;
      left: 14px;
      top: 6px;
    }

    &:after {
      content: "";
      display: block;
      position: absolute;
      height: 14px;
      width: 1px;
      background: #e8e7e6;
      left: 14px;
      top: 6px;
      left: 18px;
    }
  }
}
</style>
