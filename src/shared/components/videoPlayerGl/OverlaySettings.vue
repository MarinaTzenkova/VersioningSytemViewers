<template>
  <setting-box
    class="mt-2"
    :name="name"
    :hue="options.hue"
    :selected="options.show"
    @checked="options.show = $event"
    @color="options.hue = $event"
  >
    <template #body>
      <div class="flex flex-row settingmenu">
        <p class="font-bold">Threshold:</p>
        <input
          v-model="options.threshold"
          type="range"
          min="0"
          max="1"
          step="0.001"
        />
        <input
          v-model="options.threshold"
          type="number"
          class="w-16 border rounded-lg font-bold"
          min="0"
          max="1"
          step="0.01"
        />
      </div>
      <div class="flex flex-row settingmenu">
        <p class="font-bold">Brightness:</p>
        <input
          v-model="options.brightness"
          type="range"
          min="0"
          max="1"
          step="0.001"
        />
        <input
          v-model="options.brightness"
          type="number"
          class="w-16 border rounded-lg font-bold"
          min="0"
          max="1"
          step="0.01"
        />
      </div>
      <div class="flex flex-row settingmenu">
        <p class="font-bold">Contrast:</p>
        <input
          v-model="options.contrast"
          type="range"
          min="0"
          max="5"
          step="0.01"
        />
        <input
          v-model="options.contrast"
          type="number"
          class="w-16 border rounded-lg font-bold"
          min="0"
          max="5"
          step="0.01"
        />
      </div>
    </template>
    <template #footer>
      <div class="flex flex-row justify-end mt-2">
        <button
          class="bg-gray-600 px-5 py-2 text-white rounded hover:bg-gray-700"
          @click="$emit('resetSettings', name)"
        >
          Reset
        </button>
        <!-- <button-async
          class="bg-blue-600 px-5 py-2 text-white rounded hover:bg-blue-700 ml-2"
          :loading="disableSave"
          @click="
            $emit('saveSettings', {
              Threshold: parseFloat(options.threshold),
              Brightness: options.brightness,
              Contrast: options.contrast,
              ChannelType: name
            })
          "
        >
          Save
        </button-async> -->
      </div>
    </template>
  </setting-box>
</template>

<script>
import SettingBox from "./SettingsBox.vue";
// import ButtonAsync from "@/shared/components/ButtonAsync.vue";

export default {
  components: {
    SettingBox
    // ButtonAsync
  },
  props: {
    options: { type: Object, required: false },
    name: { type: String, required: true },
    disableSave: { type: Boolean, default: false }
  }
};
</script>

<style scoped>
.settingmenu {
  display: grid;
  grid-template-columns: 100px max-content 20px;
  grid-column-gap: 0.5em;
  margin-top: 3px;
  margin-bottom: 3px;
}
</style>
