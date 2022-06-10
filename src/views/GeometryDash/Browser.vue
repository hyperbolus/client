<template>
  <layout-standard title="Database Browser">
    <!--
    <ais-instant-search :search-client="searchClient" index-name="levels_index">
      <ais-search-box class="mb-2 w-full text-neutral-700" />
      <ais-stats class="mb-2"/>
      <ais-hits>
        <template v-slot:item="{ item }">
          <div class="mb-4 flex flex-col bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-2 px-4 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">
            <h2 class="font-bold text-2xl">{{ item.name }}</h2>
            <ais-highlight attribute="description" :hit="item" highlightedTagName="mark"/>
          </div>
        </template>
      </ais-hits>
    </ais-instant-search>
    -->
  </layout-standard>
</template>
<script>
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import LayoutStandard from "@/components/LayoutStandard";
//import { AisInstantSearch, AisSearchBox, AisHits, AisHighlight, AisStats } from 'vue-instantsearch/vue3/es'

export default {
  name: "Browser",
  components: {
    LayoutStandard,
    /*
    AisInstantSearch,
    AisSearchBox,
    AisHits,
    AisHighlight,
    AisStats*/
  },
  data() {
    return {
      query: '',
      levels: [],
      searchClient: instantMeiliSearch(
          "",
          ""
      ),
    }
  },
  methods: {
    async search() {
      this.query = document.getElementById('searchBar').value;
      await fetch('https://gdbrowser.com/api/search/'+this.query+"?")
      .then(res => res.json())
      .then(data => this.levels = data)
      console.log(this.levels);
    }
  }
}
</script>
<style>
.ais-SearchBox-input {
  width: 100%;
}
.ais-SearchBox-reset, .ais-SearchBox-submit {
  display: none;
}
</style>