<template>
  <div class="h-screen">
    <div class="flex justify-center items-center h-64">
      <label for="search"
        ><span class="text-lg">Enter experiment id</span>
        <input
          id="search"
          v-model="experimentId"
          type="text"
          name="search"
          class="form-input ml-2"
        />
      </label>
      <button
        class="bg-blue-600 rounded h-8 w-12 text-white mx-3 text-lg hover:bg-blue-700"
        @click="search"
      >
        Go
      </button>
    </div>
    <div class="px-5 flex flex-col border border-gray-500 h-auto">
      <div class="text-center text-lg font-bold mb-10 ">
        Available ids to input
      </div>
      <div v-for="id in experimentIds" :key="id" class="flex justify-center">
        {{ id }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      experimentId: "",
      experimentIds: [
        "5814736e-183d-40bd-8e4d-83849bc39f72",
        "ae6ceb2e-fa0b-408a-9c22-17a88ac32019",
        "a39ac752-e74d-480b-91af-f2eb5d195169",
        "0d78f7be-428d-4271-b3ef-da829a04a3eb",
        "c73cda47-8d3b-4521-be2d-4c138e171ccd",
        "31f7e399-7414-4675-9c47-081f330cb9ae"
      ]
    };
  },
  methods: {
    search() {
      window.location.href = `/${this.experimentId}/output`;
    }
  }
};
</script>
