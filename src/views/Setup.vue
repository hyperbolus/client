<template>
  <div class="flex flex-col h-screen bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-white">
    <!-- Title Bar -->
    <div data-tauri-drag-region class="dark:bg-neutral-900 bg-neutral-50 flex flex-row text-neutral-700 dark:text-neutral-400 justify-between w-full fixed select-none border-b border-b-neutral-200 dark:border-b-neutral-800">
      <div class="flex flex-row w-1/6 items-center" data-tauri-drag-region>
        <!-- vestigial div for jsutify between to work, or im too lazy to figure out an alternative -->
      </div>
      <span @auxclick="doneLoading = false" class="pl-1 text-sm font-bold" data-tauri-drag-region style="padding-top:1px;">Hyperbolus</span>
      <div class="flex flex-row justify-end w-1/6" data-tauri-drag-region>
        <div @click="this.ctrl(0)" class="px-2 py-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
          </svg>
        </div>
        <div @click="this.ctrl(2)" class="px-2 py-1 hover:bg-red-600 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
    </div>
    <!-- Pages -->
    <div class="flex flex-col justify-between h-full w-full p-10 pb-4">
      <!-- lazy solution to flex center placement -->
      <div v-if="page === 0">
        <img class="animate-fade-in w-1/2 my-8 mx-auto" src="../assets/logo.png" alt="logo"/>
      </div>
      <div v-if="page === 1">
        <h2 class="text-center text-2xl font-bold mb-4">Appearance</h2>
        <div class="flex flex-row justify-between gap-4">
          <div @click="setDark(false)" class="select-none w-full rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-900 border-2 border-neutral-50 dark:border-neutral-700 transition transition-colors">
            <div class="flex flex-col items-center p-4" :class="darkMode ? '' : 'bg-neutral-200'">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3>Light Mode</h3>
            </div>
          </div>
          <div @click="setDark(true)" class="select-none w-full rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-900 border-2 border-neutral-50 dark:border-neutral-700 transition transition-colors">
            <div class="flex flex-col items-center p-4 w-full h-full" :class="darkMode ? 'dark:bg-neutral-900' : ''">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <h3>Dark Mode</h3>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="page === 2">
        <h2 class="font-bold text-2xl mb-2 text-center">Setup</h2>
        <p class="text-center text-sm mb-4">You have the following games already installed!</p>
        <div class="w-full mb-2 rounded bg-neutral-100 dark:bg-neutral-700 py-1 px-2 text-neutral-700 dark:text-white flex flex-row justify-between items-center">
          <h2 class="font-bold">Geometry Dash</h2>
          <span v-if="geometrydash" class="font-bold text-green-500">Installed</span>
          <span v-else class="font-bold text-neutral-400">Not Installed</span>
        </div>
        <div class="w-full mb-2 rounded bg-neutral-100 dark:bg-neutral-700 py-1 px-2 text-neutral-700 dark:text-white flex flex-row justify-between items-center">
          <h2 class="font-bold">Soundodger</h2>
          <span v-if="soundodger" class="font-bold text-green-500">Installed</span>
          <span v-else class="font-bold text-neutral-400">Not Installed</span>
        </div>
        <div class="w-full mb-2 rounded bg-neutral-100 dark:bg-neutral-700 py-1 px-2 text-neutral-700 dark:text-white flex flex-row justify-between items-center">
          <h2 class="font-bold">Overpass</h2>
          <span v-if="overpass" class="font-bold text-green-500">Installed</span>
          <span v-else class="font-bold text-neutral-400">Not Installed</span>
        </div>
        <div class="w-full mb-2 rounded bg-neutral-100 dark:bg-neutral-700 py-1 px-2 text-neutral-700 dark:text-white flex flex-row justify-between items-center">
          <h2 class="font-bold">Spin Rhythm XD</h2>
          <span v-if="spinrhythm" class="font-bold text-green-500">Installed</span>
          <span v-else class="font-bold text-neutral-400">Not Installed</span>
        </div>
      </div>
      <!-- lazy solution to flex center placement -->
      <div  class="select-none">&nbsp;</div>
      <!-- Setup Naviagtion -->
      <div class="flex flex-row justify-between">
        <button @click="page--" v-if="page !== 0" class="select-none bg-neutral-50 dark:bg-neutral-600 rounded py-1 px-2">&lt; Back</button>
        <div class="invisible select-none">&nbsp;</div>
        <!--<button v-else disabled class="select-none bg-neutral-300 dark:bg-neutral-900 dark:text-neutral-500 rounded py-1 px-2">&lt; Back</button>-->
        <button @click="page++" v-if="page !== 2" class="select-none bg-neutral-50 dark:bg-neutral-600 rounded py-1 px-2">Next &gt;</button>
        <button @click="done" v-else class="select-none bg-green-500 text-white rounded py-1 px-2">Done</button>
      </div>
    </div>
  </div>
</template>

<script>
import {invoke} from '@tauri-apps/api/tauri'
import {appWindow, LogicalSize} from "@tauri-apps/api/window";

export default {
  name: 'Setup',
  data() {
    return {
      darkMode: null,
      soundodger: false,
      geometrydash: false,
      overpass: false,
      spinrhythm: false,
      page: 0
    }
  },
  methods: {
    setDark(state) {
      if (state) {
        document.getElementById('app').classList.add('dark');
        this.darkMode = true;
      } else {
        document.getElementById('app').classList.remove('dark');
        this.darkMode = false;
      }
    console.log(this.darkMode)
    },
    async done() {
      await appWindow.setSize(new LogicalSize(800, 500));
      await appWindow.center();
      await appWindow.setResizable(true);
      this.$emit('done')
    },
    async ctrl(mode) {
      switch (mode) {
        case 0:
          await appWindow.minimize();
          break;
        case 1:
          if (await appWindow.isMaximized()) {
            await appWindow.unmaximize();
          } else {
            await appWindow.maximize();
          }
          break;
        case 2:
          await appWindow.close();
          break;
      }
    }
  },
  async beforeMount() {
    this.darkMode = document.getElementById('app').classList.contains('dark');
    console.log(this.darkMode)
    await appWindow.setResizable(false);
    await appWindow.setSize(new LogicalSize(400, 500));
    await appWindow.center();
    let games;
    await invoke('check_games').then((res) => games = res.toString().split("\n"));
    for (let i = 0; i < games.length; i++) {
      let path = games[i].split("\\");
      let game = path[path.length - 1];
      switch (game) {
        case "Soundodger":
        case "Soundodger 2":
          this.soundodger = true;
          break;
        case "Geometry Dash":
          this.geometrydash = true;
          break;
        case "Overpass":
          this.overpass = true;
          break;
        case "Spin Rhythm XD":
          this.spinrhythm = true;
          break;
      }
    }
  }
}
</script>