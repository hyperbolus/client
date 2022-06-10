<template>
  <layout-standard title="Launch Profiles">
    <template #alt-header>
      <div class="space-x-2">
        <button @click="loadProfiles" class="bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">Refresh</button>
        <button @click="loadProfiles" class="bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">New Profile</button>
      </div>
    </template>
    <div class="flex flex-col space-y-4">
      <div v-for="(profile, index) in profiles" v-bind:key="index" class="bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-2 px-4 text-neutral-700 dark:text-white flex flex-row justify-between items-center shadow hover:shadow-lg transition transition-shadow">
        <div class="flex flex-row items-center">
          <div class="flex flex-col items-center mr-4">
            <img class="w-12" src="@/assets/profileicons/gd_logo.png" alt="Profile Icon"/>
            <span class="font-bold text-sm rounded bg-neutral-200 dark:bg-neutral-800 px-1 -mt-2">{{ profile.gameVersion }}</span>
          </div>
          <div class="flex flex-col space-y-2">
            <h2 class="font-bold text-2xl">{{ profile.name }}</h2>
            <div class="flex flex-row space-x-2">
              <span class="text-sm rounded bg-neutral-200 dark:bg-neutral-800 px-1">Type: {{ profile.type }}</span>
              <span class="text-sm rounded bg-neutral-200 dark:bg-neutral-800 px-1">Loader: {{ profile.loader }} {{ profile.loaderVersion }}</span>
              <span class="text-sm rounded bg-neutral-200 dark:bg-neutral-800 px-1">Mods: {{ profile.mods }}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-row space-x-2">
          <div @click="launch" class="bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">Launch</div>
          <a href="#" class="bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">Edit</a>
        </div>
      </div>
    </div>
  </layout-standard>
</template>
<script>
import LayoutStandard from "@/components/LayoutStandard";
import {readTextFile} from "@tauri-apps/api/fs";
import {open} from "@tauri-apps/api/shell";
export default {
  components: {LayoutStandard},
  data() {
    return {
      profiles: [],
    }
  },
  methods: {
    loadProfiles() {
      readTextFile("profiles.json", {dir: 18})
      .then(data => this.profiles = JSON.parse(data))
    },
    launch() {
      open("steam://rungameid/322170");
    }
  },
  beforeMount() {
    this.loadProfiles();
  }
}
</script>