<template>
  <layout-standard title="Library">
    <template #alt-header>
      <button @click="refresh" class="bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">Refresh Levels</button>
    </template>
    <h4 v-if="levels.length === 0">Loading...</h4>
    <div v-else class="flex flex-col space-y-4">
      <level-ticket v-for="(level, index) in levels" v-bind:key="index" :title="level.title" :subtitle="level.artist">
        <div class="bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-600 items-center p-2 mr-2 h-fit transition transition-colors text-neutral-700 dark:text-neutral-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
      </level-ticket>
    </div>
  </layout-standard>
</template>
<script>
import LayoutStandard from "@/components/LayoutStandard";
import LevelTicket from "@/components/LevelTicket";
import {readDir} from "@tauri-apps/api/fs";

export default {
  name: 'Library',
  components: {LevelTicket, LayoutStandard},
  data() {
    return {
      levels: []
    }
  },
  methods: {
    async refresh() {
      this.levels = [];
      let lines;
      await readDir('Soundodger2/levels', {dir: 7}).then((data) => lines = data);
      for (let i = 0; i < lines.length; i++) {
        let path = lines[i].name;
        path = path.split("-");
        let level = {
          title: path[1],
          artist: path[0].substring(3),
        };
        this.levels.push(level)
      }
    }
  },
  async beforeMount() {
    await this.refresh();
  }
}
</script>