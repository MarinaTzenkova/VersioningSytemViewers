<template>
  <div>
    <video-player
      :images="snapshots"
      :index="scanIndex"
      @indexChanged="setScanIndex"
    >
      <template #head>
        <!-- TODO: can download, download buttons -->
        <div class="flex items-center">
          here are buttons usually
        </div>
      </template>
      <template #footer>
        <div class="flex flex-wrap justify-between text-grey-darkest">
          <div class="flex">
            <div>Time:</div>
            <div class="font-bold ml-2">
              {{ parseInt(scan - scans[0]) | formatDateMilliseconds }}
            </div>
          </div>
          <div class="flex" v-if="fetchedScans">
            <div>Temperature:</div>
            <div class="font-bold ml-2">
              {{ temperature[scan].temperature + " °C" }}
            </div>
          </div>
          <div class="flex">
            <div>Taken on:</div>
            <div class="font-bold ml-2">
              {{ scans[scanIndex] | datetime }}
              {{ " (" + (scanIndex + 1) + ")" }}
            </div>
          </div>
        </div>
        <div class="flex flex-wrap justify-between text-grey-darkest mt-2">
          <div
            v-if="activeTab === 'Confluence' && fetchedConfluence"
            class="flex"
          >
            <div>Coverage:</div>
            <div class="font-bold ml-2">
              {{ confluence[scan].coverage | confluence }}
            </div>
          </div>
        </div>
      </template>
    </video-player>
  </div>
</template>

<script>
import { inject, computed } from "@vue/composition-api";
//global components
import VideoPlayer from "@/shared/components/videoPlayer/VideoPlayer.vue";
export default {
  components: { VideoPlayer },
  setup() {
    const { images, timepoints, setTimepoint, tabs, coverage } = inject("data");
    const activeTab = computed(() => tabs.active);
    const snapshots = computed(() => images.urls[activeTab.value]);
    const scans = computed(() => timepoints.all);
    const scan = computed(() => timepoints.active);

    const scanIndex = computed(() => scans.value.indexOf(scan.value));
    const confluence = computed(() => coverage.byId);
    const temperature = computed(() => timepoints.data);
    const fetchedConfluence = computed(() => coverage.fetched);
    const fetchedScans = computed(() => timepoints.fetched);

    function setScanIndex(index) {
      setTimepoint(scans.value[index]);
    }

    return {
      snapshots,
      scans,
      scan,
      scanIndex,
      setScanIndex,
      activeTab,
      confluence,
      temperature,
      fetchedConfluence,
      fetchedScans
    };
  }
};
</script>
