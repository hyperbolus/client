<template>
  <layout-standard title="Database Browser" class="h-full">
    <template #alt-header>
      <div class="x items-center space-x-2">
        <span>Search Descriptions (ALPHA):</span>
        <Toggle v-model="fullText"/>
      </div>
    </template>
    <ais-instant-search v-if="fullText" :search-client="searchClient" index-name="levels_index">
      <span>*NOTE: This search uses a limited dataset of featured levels</span>
      <ais-search-box class="mb-2 w-full text-neutral-700" />
      <ais-stats class="mb-2"/>
      <ais-hits>
        <template v-slot:item="{ item }">
          <div class="y mb-4 box box-shadow click text-neutral-700 dark:text-white">
            <h2 class="font-bold text-2xl">{{ item.name }}</h2>
            <ais-highlight attribute="description" :hit="item" highlightedTagName="mark"/>
          </div>
        </template>
      </ais-hits>
    </ais-instant-search>
    <div v-else class="y space-y-4 h-full">
      <div class="space-x-2">
        <text-input v-model="query" @keydown.enter="search" placeholder="Search levels..."/>
        <button-round @click="search" placeholder="Search levels...">Search</button-round>
      </div>
      <div v-if="levels.length === 0" class="x justify-center items-center h-full rounded my-8 p-4 bg-neutral-300 dark:bg-neutral-900">
        <span v-if="searching" class="opacity-50">Searching...</span>
        <span v-else-if="!searched" class="opacity-50">Type in a query and hit enter to search.</span>
        <span v-else-if="failed" class="opacity-50">Nothin' here, bud.</span>
      </div>
      <router-link v-for="(level, index) in levels" :key="index" :to="'/gd/level/' + level.id">
        <round-box class="y box-shadow click">
          <div class="x items-center space-x-2">
            <h1 class="text-2xl font-bold">{{ level.name }}</h1>
            <span>By: {{ level.author }}</span>
          </div>
          <p>{{ level.description }}</p>
        </round-box>
      </router-link>
    </div>
  </layout-standard>
</template>
<script>
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import LayoutStandard from "@/components/LayoutStandard";
import { AisInstantSearch, AisSearchBox, AisHits, AisHighlight, AisStats } from 'vue-instantsearch/vue3/es'
import Toggle from "@/components/Toggle";
import TextInput from "@/components/TextInput";
import ButtonRound from "@/components/ButtonRound";
import RoundBox from "@/components/RoundBox";

export default {
  name: "Browser",
  components: {
    RoundBox,
    ButtonRound,
    TextInput,
    Toggle,
    LayoutStandard,
    AisInstantSearch,
    AisSearchBox,
    AisHits,
    AisHighlight,
    AisStats
  },
  data() {
    return {
      query: '',
      searched: false,
      levels: [],
      fullText: false,
      searching: false,
      failed: false,
      searchClient: instantMeiliSearch(
          "https://search.gdps.io",
          "Ol82zPolf920dd3e76e8767dee606efd41d624b3c2ec355bc01859306802a33431548610"
      ),
    }
  },
  methods: {
    search() {
      this.levels = [];
      if(!this.searching && this.query !== '') {
        this.searching = true;
        fetch('https://browser.gdps.io/api/search/' + this.query)
            .then(res => {
              console.log(res.ok);
              if (!res.ok) {
                throw Error(res.statusText);
              }
              return res.json();
            })
            .then(data => {
              this.levels = data;
              this.failed = false;
              this.searching = false;
            }).catch (() => {
              this.failed = true;
              this.searching = false;
            })
        this.searched = true;
      }
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