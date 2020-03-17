<template>
  <canvas />
</template>

<script>
import { TooGL } from "toogl";
import rgb2hsv from "./shaders/rgb2hsv.glsl";
import hsv2rgb from "./shaders/hsv2rgb.glsl";
import blendMultiply from "./shaders/blendMultiply.glsl";
import blendAverage from "./shaders/blendAverage.glsl";
import threshold from "./shaders/threshold.glsl";
import contrast from "./shaders/contrast.glsl";
import lux from "./shaders/lux.glsl";
const shader = `
precision mediump float;
${contrast}
${threshold}
${rgb2hsv}
${hsv2rgb}
${blendMultiply}
${blendAverage}
${lux}

void main() {
gl_FragColor = lux();
}

`;
export default {
  props: {
    images: {
      type: Object,
      required: true
    },
    redOptions: {
      type: Object,
      required: true
    },
    greenOptions: {
      type: Object,
      required: true
    },
    confluenceOptions: {
      type: Object,
      required: true
    },
    baseOptions: {
      type: Object,
      required: true
    },
    size: {
      type: Array,
      required: true
    }
  },
  watch: {
    images: {
      handler(images) {
        if (
          images.Confluence &&
          images.Scratch &&
          images.Brightfield &&
          images.Red &&
          images.Scratch
        ) {
          this.gl.addTexture("u_base", images.Brightfield);
          this.gl.addTexture("u_red", images.Red);
          this.gl.addTexture("u_green", images.Green);
          this.gl.addTexture("u_conf", images.Confluence);
          this.gl.addTexture("u_scratch", images.Scratch);
          this.gl.render();
        }
      },
      deep: true
    },
    greenOptions: {
      handler(opts) {
        this.gl.updateStruct("u_gOpts", opts);
        this.gl.render();
      },
      deep: true
    },
    redOptions: {
      handler(opts) {
        this.gl.updateStruct("u_rOpts", opts);
        this.gl.render();
      },
      deep: true
    },
    confluenceOptions: {
      handler(opts) {
        this.gl.updateStruct("u_cOpts", opts);
        this.gl.render();
      },
      deep: true
    },
    "baseOptions.show": {
      handler(show) {
        this.gl.updateUniform("u_bSelected", show);
        this.gl.render();
      },
      deep: true
    }
  },
  mounted() {
    const gl = new TooGL({
      gl: this.$el.getContext("webgl", {
        premultipliedAlpha: false
      }),
      size: this.size,
      shader
    });
    this.gl = gl;
    const optionsStruct = {
      show: gl.UTYPES.i1,
      brightness: gl.UTYPES.f1,
      contrast: gl.UTYPES.f1,
      threshold: gl.UTYPES.f1,
      hue: gl.UTYPES.f1
    };

    gl.addStruct("u_rOpts", optionsStruct);
    gl.updateStruct("u_rOpts", this.redOptions);

    gl.addStruct("u_gOpts", optionsStruct);
    gl.updateStruct("u_gOpts", this.greenOptions);

    gl.addStruct("u_cOpts", optionsStruct);
    gl.updateStruct("u_cOpts", this.confluenceOptions);

    gl.addUniform("u_bSelected", gl.UTYPES.i1);
    gl.updateUniform("u_bSelected", this.baseOptions.show);

    this.gl.render();
  }
};
</script>
