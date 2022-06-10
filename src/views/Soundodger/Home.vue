<template>
  <layout-standard title="Home">
    <div class="flex flex-col text-neutral-700 dark:text-white">
      <h2 class="font-bold text-xl mb-2">Newest</h2>
      <div class="overflow-x-scroll flex flex-row flex-none space-x-4 snap-x">
        <file-preview class="snap-start" v-for="file in levels" v-bind:key="file.id" :file="file"/>
      </div>
    </div>
  </layout-standard>
</template>
<script>

import FilePreview from "@/views/Soundodger/FilePreview";
import LayoutStandard from "@/components/LayoutStandard";
export default {
  name: 'Home',
  components: {LayoutStandard, FilePreview},
  data() {
    return {
      levels: [],
      packs: []
    }
  },
  async beforeMount() {
    await fetch('https://soundodger-community.com/api/downloads/files/?sortBy=day&categories=1,4,2,5 &sortDir=desc&key=')
        .then(res => res.json())
        .then(data => this.levels = data.results);


  }
}
</script>
