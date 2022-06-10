<template>
  <main class="w-full h-full overflow-scroll bg-neutral-200 dark:bg-neutral-800">
    <layout-standard title="Control Panel">
      <div class="space-y-4 max-w-xl">
        <div class="flex flex-row justify-between items-center">
          <span>Support Button</span>
          <Toggle v-model="this.$root.$data.config.supportButton"/>
        </div>
        <div class="flex flex-row justify-between items-center">
          <span>Feedback Button</span>
          <Toggle v-model="this.$root.$data.config.feedbackButton"/>
        </div>
        <div class="flex flex-row justify-between items-center">
          <span>Dark Mode</span>
          <Toggle v-model="this.$root.$data.config.darkMode"/>
        </div>
        <div class="space-x-2">
          <router-link to="/gd/editor" class="inline-block rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">
            Editor
          </router-link>
          <button @click="$root.$data.configLoad" class="rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">
            Reload Config
          </button>
          <button @click="openDir" class="rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">
            Open Roaming Folder
          </button>
        </div>
        <details open>
          <summary>Config</summary>
          <pre class="text-xs rounded bg-neutral-700 p-2 text-white">{{ $root.config }}</pre>
        </details>
      </div>
    </layout-standard>
  </main>
</template>
<script>

import LayoutStandard from "@/components/LayoutStandard";
import Toggle from "@/components/Toggle";
import { open } from "@tauri-apps/api/shell"
import { appDir } from "@tauri-apps/api/path";

export default {
  name: 'Admin',
  components: {Toggle, LayoutStandard},
  methods: {
    async openDir() {
      await open(await appDir());
    }
  }
}
</script>
