<template>
  <main class="w-full h-full overflow-scroll bg-neutral-200 dark:bg-neutral-800">
    <layout-standard title="Debug Menu">
      <div class="space-y-4 max-w-xl">
        <div class="flex flex-row justify-between items-center">
          <span>Support Button</span>
          <Toggle v-model="this.$root.$data.config.supportButton"/>
        </div>
        <div class="flex flex-wrap gap-2">
          <router-link to="/gd/editor" class="inline-block rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">
            Editor
          </router-link>
          <button @click="$root.configLoad" class="rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">
            Reload Config
          </button>
          <button @click="openDir" class="rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">
            Open Roaming Folder
          </button>
          <button @click="this.$root.config.debug = false" class="rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">
            Remove Debug Mode
          </button>
          <button @click="this.$root.config.server = 'http://dashgd.test/'" class="rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">
            Use Local Server
          </button>
          <button @click="this.$root.config.server = 'https://hyperbol.us/'" class="rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">
            Use Production Server
          </button>
          <button @click="loadConfig" class="rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">
            Load Config From File
          </button>
          <button @click="reset" class="rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">
            Reset Config and Relaunch
          </button>
        </div>
        <details open>
          <summary>Config</summary>
          <pre class="text-xs rounded bg-neutral-100 dark:bg-neutral-700 p-2 text">{{ $root.config }}</pre>
        </details>
      </div>
    </layout-standard>
  </main>
</template>
<script>

import LayoutStandard from "@/components/LayoutStandard";
import Toggle from "@/components/Toggle";
import {open} from "@tauri-apps/api/shell"
import {open as openDialog} from "@tauri-apps/api/dialog"
import {appDir} from "@tauri-apps/api/path";
import {readTextFile, removeFile} from "@tauri-apps/api/fs";
import {relaunch} from "@tauri-apps/api/process";

export default {
  name: 'Admin',
  components: {Toggle, LayoutStandard},
  methods: {
    async openDir() {
      await open(await appDir());
    },
    async loadConfig() {
      let path = await openDialog({
        title: 'Select Config File',
        filters: [{
          name: 'Hyperbolus Config File',
          extensions: ['json'],
        }],
        defaultPath: await appDir()
      });
      this.$root.config = JSON.parse(await readTextFile(path.toString(), {}));
    },
    reset() {
      removeFile('config.json', {dir: 18})
          .then(() => relaunch());
    }
  }
}
</script>
