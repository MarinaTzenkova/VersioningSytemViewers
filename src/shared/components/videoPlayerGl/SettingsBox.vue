<template>
  <div class="line">
    <div>
      <label class="inline-flex items-center">
        <input
          :id="`${name}-checkbox`"
          v-model="checked"
          type="checkbox"
          :class="`form-checkbox w-6 h-6 ${colorSelected}`"
          :value="true"
        />
        <label
          class="font-bold ml-1 cursor-pointer select-none"
          :for="`${name}-checkbox`"
          :class="{ 'text-gray-600': !checked, colorSelected }"
          >{{ name }}</label
        >
      </label>
    </div>
    <div
      v-if="name != 'Brightfield' && selected"
      class="w-10 h-6 flex items-center justify-center rounded-full backdrop-filter bg-white-half"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <svg
        ref="options"
        viewBox="0 0 24 24"
        class="fill-current w-10 h-10 text-gray-800 hover:text-blue-700 cursor-pointer absolute"
        @click="open"
      >
        <path
          d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z"
        />
      </svg>
      <tooltip-component
        v-if="!settings"
        class="relative z-10 mt-2"
        :show="hover"
        :tooltip-header="'Click to open channel settings'"
      />
      <portal v-if="settings" to="tooltips">
        <with-click-outside :do="close">
          <div
            ref="dropdown"
            class="rounded bg-white shadow-md border absolute py-1 px-1 ml-1 my-2"
            style="z-index: 9"
          >
            <div
              id="dropdown"
              class="block px-4 py-3 bg-white flex flex-col whitespace-no-wrap"
            >
              <slot name="body" />
              <color-picker @change="value => color(value)" />
              <slot name="footer" />
            </div>
          </div>
        </with-click-outside>
      </portal>
    </div>
  </div>
</template>

<script>
import Popper from "popper.js";
import ColorPicker from "./ColorPicker.vue";
import WithClickOutside from "@/shared/components/utils/WithClickOutside.vue";
import TooltipComponent from "@/shared/components/TooltipComponent.vue";
export default {
  components: {
    WithClickOutside,
    TooltipComponent,
    ColorPicker
  },
  props: {
    name: { type: String, required: true },
    selected: { type: Boolean, required: true },
    hue: { type: Number, required: false }
  },
  data() {
    return {
      settings: false,
      checked: this.selected,
      hover: false,
      colorSelected: "text-blue-600"
    };
  },
  computed: {
    id() {
      return this.name + "-checkbox";
    }
  },
  watch: {
    selected: function() {
      this.checked = this.selected;
    },
    checked(value) {
      this.$emit("checked", value);
    },
    hue() {
      if (this.hue == 0) this.colorSelected = "text-red-500";
      if (this.hue == 2 / 7) this.colorSelected = "text-green-400";
    }
  },
  beforeMount() {
    if (this.name === "Red") {
      this.colorSelected = "text-red-500";
    } else if (this.name === "Green" || this.name === "Confluence") {
      this.colorSelected = "text-green-400";
    } else {
      this.colorSelected = "text-blue-600";
    }
  },
  beforeDestroy() {
    if (this.popper) {
      this.popper.destroy();
    }
  },
  methods: {
    setupPopper() {
      if (this.popper) {
        this.popper.destroy();
      }
      this.popper = new Popper(this.$refs.options, this.$refs.dropdown, {
        placement: "right-start"
      });
    },
    close() {
      this.settings = false;
    },
    open() {
      this.settings = !this.settings;
      this.$nextTick(() => {
        this.setupPopper();
      });
    },
    color(value) {
      this.colorSelected = value.text;
      this.$emit("color", value.color);
    }
  }
};
</script>

<style scoped>
.line {
  display: grid;
  grid-template-columns: repeat(2, max-content);
  grid-column-gap: 0.2em;
}
.slider {
  -webkit-appearance: none;
  width: 60%;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #02a9e9;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #02a9e9;
  cursor: pointer;
}
a#dropdown:hover {
  div {
    color: #4188c7;
  }
  svg path {
    fill: #4188c7;
    color: #4188c7;
  }
}
</style>
