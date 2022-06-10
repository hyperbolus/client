<template>
  <layout-standard title="Launch Profiles">
    <div v-if="formModal" @click.self="formModal = false" class="cursor-pointer flex flex-col items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 bg-black">
      <!-- note: just like the Hyperbolus container, the overlay actually fills whole screen
       but its fine because title bar has raised z index. just something to keep in mind if
       the vertical centering isnt exact within the app's active content area. not worth using absolute
       top-6 and fighting the screen height which pokes out under the page :)-->
      <div class="cursor-auto w-2/3 h-2/3 flex flex-col rounded bg-neutral-200 dark:bg-neutral-900 p-4 space-y-2">
        <h1 class="font-bold text-2xl">Create New Profile</h1>
        <input type="text" class="rounded bg-neutral-300 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-600 py-1 px-2 text-neutral-700 dark:text-white placeholder-neutral-500" placeholder="Profile Name"/>
        <div class="flex gap-2">
          <label class="grow flex flex-col">Mod Loader
            <select class="mt-1 rounded border border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900">
              <option value="steam">None (Vanilla Steam)</option>
              <option value="geode">Geode</option>
              <option value="modldr">ModLdr</option>
              <option value="hm">GD Hackermode</option>
              <option value="mh">MegaHack</option>
            </select>
          </label>
          <label class="grow flex flex-col">Save File
            <select class="mt-1 rounded border border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900">
              <option value="new">+ Create New Save</option>
              <option v-for="(save, key) in saves" :key="key" :value="key">{{ save.name }}</option>
            </select>
          </label>
        </div>
        <div class="flex justify-between">
          <span>Inactive Mods</span>
          <span>Active Mods</span>
        </div>
        <div class="flex gap-2 justify-between grow">
          <select class="grow h-full rounded border border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900" multiple>
            <option v-for="(mod, key) in formModsInactive" :key="key" :value="key">{{ mod.name }}</option>
            <option disabled class="opacity-0">fillerfillerfillerfillerfillerfillerfillerfiller</option>
          </select>
          <div class="flex flex-col space-y-2">
            <ButtonRoundSmall>Add&nbsp;&gt;</ButtonRoundSmall>
            <ButtonRoundSmall>&lt;&nbsp;Remove</ButtonRoundSmall>
            <ButtonRoundSmall>Refresh</ButtonRoundSmall>
          </div>
          <select class="grow rounded border border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900" multiple>
            <option v-for="(mod, key) in formModsActive" :key="key" :value="key">{{ mod.name }}</option>
            <option disabled class="opacity-0">fillerfillerfillerfillerfillerfillerfillerfiller</option>
          </select>
        </div>
        <div class="flex flex-row gap-2">
          <button @click="formModal = false;" class="grow rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">Cancel</button>
          <button @click="formModal = false;" class="grow rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">Create</button>
        </div>
      </div>
    </div>
    <template #alt-header>
      <div class="space-x-2">
        <button @click="loadProfiles" class="rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">Refresh</button>
        <button @click="createProfileForm()" class="rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">New Profile</button>
      </div>
    </template>
    <div class="flex flex-col space-y-4">
      <div v-for="(profile, index) in profiles" v-bind:key="index" class="rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-2 px-4 text-neutral-700 dark:text-white flex flex-row justify-between items-center shadow hover:shadow-lg transition transition-shadow">
        <div class="flex flex-row items-center">
          <div class="flex flex-col items-center mr-4">
            <img class="w-12" src="@/assets/profileicons/gd_logo.png" alt="Profile Icon"/>
            <span class="font-bold text-sm rounded bg-neutral-200 dark:bg-neutral-800 px-1 -mt-3">{{ profile.gameVersion }}</span>
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
          <div @click="launch" class="rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">Launch</div>
          <a href="#" class="rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">Edit</a>
        </div>
      </div>
    </div>
  </layout-standard>
</template>
<script>
import LayoutStandard from "@/components/LayoutStandard";
import {readTextFile} from "@tauri-apps/api/fs";
import {open} from "@tauri-apps/api/shell";
import ButtonRoundSmall from "@/components/ButtonRoundSmall";

export default {
  components: {
    ButtonRoundSmall,
    LayoutStandard
  },
  data() {
    return {
      profiles: [],
      saves: {},
      mods: {},
      formModal: false,
      formProfile: {},
      formModsInactive: [],
      formModsActive: []
    }
  },
  methods: {
    loadProfiles() {
      readTextFile("gd/profiles.json", {dir: 18})
      .then(data => this.profiles = JSON.parse(data))
    },
    loadSaves() {
      readTextFile("gd/saves.json", {dir: 18})
          .then(data => this.saves = JSON.parse(data))
    },
    loadMods() {
      readTextFile("gd/mods.json", {dir: 18})
          .then(data => this.mods = JSON.parse(data))
    },
    refreshMods() {

    },
    addMods() {

    },
    removeMods() {

    },
    launch() {
      open("steam://rungameid/322170");
    },
    createProfileForm() {
      this.formModal = true;
      this.formModsInactive = this.mods;
      this.formProfile = {
        "name": "Cunk",
        "icon" : "gd",
        "loader": "none",
        "loaderVersion" : null,
        "gameVersion" : null,
        "mods": [],
        "save": "cunk",
        "created" : new Date().toDateString()
      }
    },
    createProfile() {
      this.profiles.push();
    }
  },
  beforeMount() {
    this.loadProfiles();
    this.loadSaves();
    this.loadMods();
  }
}
</script>