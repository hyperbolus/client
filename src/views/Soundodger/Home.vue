<template>
  <layout-standard title="Home">
    <template #alt-header>
      <div class="rounded border border-amber-600 bg-amber-600 bg-opacity-25 py-1 px-2">
        <span class="text-sm">NOTE: This is an early beta, not all levels may install correctly.</span>
      </div>
    </template>
    <div class="y text-neutral-700 dark:text-white space-y-2">
      <div class="x items-center justify-between">
        <h2 class="font-bold text-xl">Levels</h2>
        <div class="space-x-2">
          <select-list class="text-sm px-2 py-1 pr-9" v-model="levels_sortBy">
            <option value="date" selected>Date</option>
            <option value="views">Views</option>
            <option value="num_downloads">Downloads</option>
            <option value="num_reviews">Reviews</option>
            <option value="num_comments">Comments</option>
            <option value="title">Title</option>
          </select-list>
          <select-list class="text-sm px-2 py-1 pr-9" v-model="levels_sortDir">
            <option value="desc" selected>Descending</option>
            <option value="asc">Ascending</option>
          </select-list>
        </div>
      </div>
      <div class="overflow-x-scroll flex flex-row flex-none space-x-2 snap-x">
        <template v-if="levels.length === 0">
          <round-box v-for="n in 10" :key="n" class="w-64 h-fit shrink-0 grow-0 px-2 space-y-2">
            <div class="h-32 dark:bg-neutral-700 animate-pulse"></div>
            <h1 class="font-bold dark:bg-neutral-700 animate-pulse">&nbsp;</h1>
            <div class="flex flex-row items-center  text-neutral-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm ml-1 dark:bg-neutral-700 w-full animate-pulse">&nbsp;</span>
            </div>
            <div class="flex flex-row justify-between items-start gap-2">
              <div class="x grow text-neutral-500 text-sm space-x-2">
                <div class="x items-center grow">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                  <div class="ml-1 w-full dark:bg-neutral-700 grow w-full animate-pulse">&nbsp;</div>
                </div>
                <div class="x items-center grow">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                  </svg>
                  <div class="ml-1 w-full dark:bg-neutral-700 grow w-full animate-pulse">&nbsp;</div>
                </div>
                <div class="x items-center  grow">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                  <div class="ml-1 w-full dark:bg-neutral-700 grow w-full animate-pulse">&nbsp;</div>
                </div>
              </div>
              <div class="p-2 dark:bg-neutral-700 animate-pulse">
                <div class="h-6 w-6"></div>
              </div>
            </div>
          </round-box>
        </template>
        <file-preview v-else class="snap-start" v-for="file in levels" :key="file.id" :file="file"/>
      </div>
      <div class="x items-center justify-between">
        <h2 class="font-bold text-xl">Level Packs</h2>
        <div class="space-x-2">
          <select-list class="text-sm px-2 py-1 pr-9" v-model="packs_sortBy">
            <option value="date" selected>Date</option>
            <option value="views">Views</option>
            <option value="num_downloads">Downloads</option>
            <option value="num_reviews">Reviews</option>
            <option value="num_comments">Comments</option>
            <option value="title">Title</option>
          </select-list>
          <select-list class="text-sm px-2 py-1 pr-9" v-model="packs_sortDir">
            <option value="desc" selected>Descending</option>
            <option value="asc">Ascending</option>
          </select-list>
        </div>
      </div>
      <div class="overflow-x-scroll flex flex-row flex-none space-x-2 snap-x">
        <template v-if="packs.length === 0">
          <round-box v-for="n in 10" :key="n" class="w-64 h-fit shrink-0 grow-0 px-2 space-y-2">
            <div class="h-32 dark:bg-neutral-700 animate-pulse"></div>
            <h1 class="font-bold dark:bg-neutral-700  animate-pulse">&nbsp;</h1>
            <div class="flex flex-row items-center  text-neutral-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm ml-1 dark:bg-neutral-700 w-full animate-pulse">&nbsp;</span>
            </div>
            <div class="flex flex-row justify-between items-start gap-2">
              <div class="x grow text-neutral-500 text-sm space-x-2">
                <div class="x items-center grow">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                  <div class="ml-1 w-full dark:bg-neutral-700 grow w-full animate-pulse">&nbsp;</div>
                </div>
                <div class="x items-center grow">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                  </svg>
                  <div class="ml-1 w-full dark:bg-neutral-700 grow w-full animate-pulse">&nbsp;</div>
                </div>
                <div class="x items-center  grow">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                  <div class="ml-1 w-full dark:bg-neutral-700 grow w-full animate-pulse">&nbsp;</div>
                </div>
              </div>
              <div class="p-2 dark:bg-neutral-700 animate-pulse">
                <div class="h-6 w-6"></div>
              </div>
            </div>
          </round-box>
        </template>
        <file-preview class="snap-start" v-for="file in packs" :key="file.id" :file="file" :pack="true"/>
      </div>
    </div>
  </layout-standard>
</template>
<script>
import FilePreview from "@/views/Soundodger/FilePreview";
import LayoutStandard from "@/components/LayoutStandard";
import SelectList from "@/components/SelectList";
import RoundBox from "@/components/RoundBox";

export default {
  name: 'Home',
  components: {RoundBox, SelectList, LayoutStandard, FilePreview},
  data() {
    return {
      levels: [],
      levels_sortDir: 'desc',
      levels_sortBy: 'date',
      levels_page: 1,
      levels_perPage: 25,
      levels_authors: null,
      levels_categories: '1,4',
      packs: [],
      packs_sortDir: 'desc',
      packs_sortBy: 'date',
      packs_page: 1,
      packs_perPage: 25,
      packs_authors: null,
      packs_categories: '2,5',
    }
  },
  watch: {
    levels_sortBy: function() {
      this.getLevels();
    },
    levels_sortDir: function() {
      this.getLevels();
    },
    packs_sortBy: function() {
      this.getPacks();
    },
    packs_sortDir: function() {
      this.getPacks();
    }
  },
  async beforeMount() {
    this.getLevels();
    this.getPacks();
  },
  methods: {
    getLevels() {
      this.levels = [];
      let params = new URLSearchParams({
        sortDir: this.levels_sortDir,
        sortBy: this.levels_sortBy,
        page: this.levels_page,
        perPage: this.levels_perPage,
        categories: this.levels_categories,
        game: 'soundodger'
      });
      fetch(this.$root.getServer()+'api/levels?' + params.toString().replaceAll('%2C', ','))
          .then(res => res.json())
          .then(data => this.levels = data.results);
    },
    getPacks() {
      this.packs = [];
      const params = new URLSearchParams({
        sortDir: this.packs_sortDir,
        sortBy: this.packs_sortBy,
        page: this.packs_page,
        perPage: this.packs_perPage,
        categories: this.packs_categories,
        game: 'soundodger'
      });
      fetch(this.$root.getServer()+'api/levels?' + params.toString().replaceAll('%2C', ','))
          .then(res => res.json())
          .then(data => this.packs = data.results);
    }
  }
}
</script>
