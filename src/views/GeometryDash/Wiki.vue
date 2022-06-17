<template>
  <layout-standard v-if="api">
    <div v-if="page">
      <h1 class="text-neutral-700 dark:text-white text-3xl font-black mb-0">{{ page.title }}</h1>
      <span class="border-b border-b-neutral-300 dark:border-b-neutral-600 mt-2 mb-4 block"></span>
      <div v-html="page.text['*']" class="-mt-4 prose dark:prose-invert prose-lg"></div>
    </div>
    <span v-else>Loading...</span>
  </layout-standard>
  <div v-else class="w-full h-full overflow-clip">
    <iframe class="w-full h-full" src="https://geometrydash.wiki"></iframe>
  </div>
</template>
<script>
import LayoutStandard from "@/components/LayoutStandard";

export default {
  components: {LayoutStandard},
  data() {
    return {
      page: null,
      api: false
    }
  },
  beforeMount() {
    if (this.api) {
      fetch('https://geometrydash.wiki/w/api.php?action=parse&page=Main_Page&format=json&origin='+location.origin)
          .then(res => res.json())
          .then(data => {
            this.page = data.parse
            console.log(this.page)
          })
    }
  }
}
</script>