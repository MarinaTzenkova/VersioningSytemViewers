<template>
  <div class="flex mt-2 items-center">
    <p class="font-bold">Color:</p>
    <div class="flex">
      <div
        class="w-6 h-6 m-1 rounded cursor-pointer bg-red-500"
        @click="$emit('change', { color: 0, text: 'text-red-500' })"
      ></div>
      <div
        class="w-6 h-6 m-1 rounded cursor-pointer bg-orange-500"
        @click="$emit('change', { color: 0.5 / 7, text: 'text-orange-500' })"
      ></div>
      <div
        class="w-6 h-6 m-1 rounded cursor-pointer bg-yellow-500"
        @click="$emit('change', { color: 1 / 7, text: 'text-yellow-500' })"
      ></div>
      <div
        class="w-6 h-6 m-1 rounded cursor-pointer bg-green-400"
        @click="$emit('change', { color: 2 / 7, text: 'text-green-400' })"
      ></div>
      <div
        class="w-6 h-6 m-1 rounded cursor-pointer bg-teal-300"
        @click="$emit('change', { color: 3.3 / 7, text: 'text-teal-300' })"
      ></div>
      <div
        class="w-6 h-6 m-1 rounded cursor-pointer bg-blue-500"
        @click="$emit('change', { color: 4 / 7, text: 'text-blue-500' })"
      ></div>
      <div
        class="w-6 h-6 m-1 rounded cursor-pointer bg-blue-700"
        @click="$emit('change', { color: 5 / 7, text: 'text-blue-700' })"
      ></div>
      <div
        class="w-6 h-6 m-1 rounded cursor-pointer bg-purple-500"
        @click="$emit('change', { color: 5.5 / 7, text: 'text-purple-500' })"
      ></div>
      <div
        class="w-6 h-6 m-1 rounded cursor-pointer bg-pink-500"
        @click="$emit('change', { color: 6 / 7, text: 'text-pink-500' })"
      ></div>
      <!-- <div class="w-6 h-6 m-1 rounded cursor-pointer black-white"></div> -->
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
.black-white {
  background-color: #000000;
  background-image: linear-gradient(45deg, #ffffff 50%, #000000 50%);
}
</style>
