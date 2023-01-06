<template>
  <div id="client" v-if="launchStage === 2" class="y overflow-clip">
    <div data-tauri-drag-region class="z-40 dark:bg-neutral-900 bg-neutral-50 x text-neutral-700 dark:text-neutral-400 justify-between w-full fixed select-none border-b border-b-neutral-200 dark:border-b-neutral-800">
      <div class="x items-center">
        <!-- Back Button -->
        <svg @click="back" xmlns="http://www.w3.org/2000/svg" class="px-1 h-6 w-6 dark:hover:text-white border-r border-r-neutral-200 dark:border-r-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
        </svg>
        <!-- Settings Button -->
        <div @mouseover="menuMode = 2" @mouseleave="menuMode = 0">
          <div class="x items-center border-r border-r-neutral-200 dark:border-r-neutral-800 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="px-1 h-6 w-6 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </div>
          <div v-if="menuMode === 2" class="y text-sm z-20 bg-neutral-50 dark:bg-neutral-900 top-6 absolute border border-neutral-200 dark:border-neutral-800">
            <span @click="menuMode = 0; modal = true; modalPage = 'about';" class="hover:bg-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white py-0.5 px-1 text-left">
              About
            </span>
            <span @click="menuMode = 0; modal = true; modalPage = 'updates';" class="hover:bg-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white py-0.5 px-1 text-left">
              Check for Updates
            </span>
            <span @click="menuMode = 0; modal = true; modalPage = 'settings';" class="hover:bg-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white py-0.5 px-1 text-left">
              Settings
            </span>
            <div id="devtab" class="y" v-if="config.debug">
              <hr class="border-neutral-200 dark:border-neutral-800"/>
              <span @click="menuMode = 0; modal = true; modalPage = 'debug';" class="hover:bg-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white py-0.5 px-1 text-left transition transition-all">
                Debug Menu
              </span>
              <span @click="menuMode = 0; modal = true; modalPage = 'console';" class="hover:bg-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white py-0.5 px-1 text-left transition transition-all">
                Debug Console
              </span>
            </div>
            <template v-if="config.developer">
              <hr class="border-neutral-200 dark:border-neutral-800"/>
              <span @click="menuMode = 0; modal = true; modalPage = 'releases';" class="hover:bg-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white py-0.5 px-1 text-left transition transition-all">
                Release Manager
              </span>
              <span @click="menuMode = 0; modal = true; modalPage = 'zenshen';" class="hover:bg-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white py-0.5 px-1 text-left transition transition-all">
                Zenshen
              </span>
            </template>
            <hr class="border-neutral-200 dark:border-neutral-800"/>
            <span onclick="alert('Pretend this works :)')" class="hover:bg-red-500 text-red-500 hover:text-white py-0.5 px-1 text-left">
              Exit
            </span>
          </div>
        </div>
      </div>
      <div class="text-sm font-bold absolute" data-tauri-drag-region style="padding-top:1px;left: calc(50vw - 38px);">
        MelodyKit
      </div>
      <div class="x justify-end">
        <div @click="this.ctrl(0)" class="px-2 py-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
          </svg>
        </div>
        <div @click="this.ctrl(1)" class="px-2 py-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <div @click="this.ctrl(2)" class="px-2 py-1 hover:bg-red-600 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
    </div>
    <div class="pt-6 pb-20 h-screen">
      <div class="y h-full bg-neutral-900">
        <div class="x flex-grow">
          <div class="y bg-neutral-800 w-1/5 text-white px-4 py-3 space-y-2">
            <div class="x items-center gap-2 text-lg font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <span>Sync</span>
            </div>
            <div class="x items-center gap-2 text-lg font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <span>Search</span>
            </div>
            <div class="x items-center gap-2 text-lg font-bold text-cyan-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <span>Library</span>
            </div>
            <div class="border-t border-t-neutral-600"></div>
            <div class="text-lg font-bold">Create Playlist</div>
            <div class="text-lg font-bold">Liked Songs</div>
          </div>
          <div class="bg-neutral-900 w-4/5 max-h-screen text-white p-4 space-y-4 overflow-y-scroll">
            <div class="x gap-2">
              <div class="rounded-full border-2 border-white text-xs px-4 py-0.5">Songs</div>
              <div class="rounded-full border-2 border-white text-xs px-4 py-0.5">Artists</div>
              <div class="rounded-full border-2 border-indigo-400 text-indigo-400 text-xs px-4 py-0.5">Albums</div>
            </div>
            <h1 class="font-bold text-2xl text-white">Albums</h1>
            <div class="flex flex-wrap gap-4">
              <div class="y flex-grow-0 basis-1 gap-2 w-fit rounded bg-neutral-800 hover:bg-neutral-700 cursor-pointer transition p-2">
                <div class="x justify-end items-end p-2 text-neutral-800 bg-indigo-900 w-40 h-40 rounded-sm shadow-lg">
                  <div class="w-fit rounded-full p-2 bg-indigo-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                      <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h2 class="font-bold">Play It</h2>
                  <h3 class="text-sm opacity-50">The Players</h3>
                </div>
              </div>
              <div class="y flex-grow-0 basis-1 gap-2 w-fit rounded bg-neutral-800 p-2">
                <div class="bg-cyan-900 w-40 h-40 rounded-sm shadow-lg"></div>
                <div>
                  <h2 class="font-bold">Title</h2>
                  <h3 class="text-sm opacity-50">Artist</h3>
                </div>
              </div>
              <div class="y flex-grow-0 basis-1 gap-2 w-fit rounded bg-neutral-800 p-2">
                <div class="bg-red-900 w-40 h-40 rounded-sm shadow-lg"></div>
                <div>
                  <h2 class="font-bold">TitleMongers</h2>
                  <h3 class="text-sm opacity-50">Artisters</h3>
                </div>
              </div>
              <div class="y flex-grow-0 basis-1 gap-2 w-fit rounded bg-neutral-800 p-2">
                <div class="bg-red-900 w-40 h-40 rounded-sm shadow-lg"></div>
                <div>
                  <h2 class="font-bold">The Title</h2>
                  <h3 class="text-sm opacity-50">The Title</h3>
                </div>
              </div>
              <div class="y flex-grow-0 basis-1 gap-2 w-fit rounded bg-neutral-800 p-2">
                <div class="bg-green-900 w-40 h-40 rounded-sm shadow-lg"></div>
                <div>
                  <h2 class="font-bold">Title</h2>
                  <h3 class="text-sm opacity-50">Artist</h3>
                </div>
              </div>
              <div class="y flex-grow-0 basis-1 gap-2 w-fit rounded bg-neutral-800 p-2">
                <div class="bg-amber-900 w-40 h-40 rounded-sm shadow-lg"></div>
                <div class="overflow-ellipsis">
                  <h2 class="font-bold">The Album of All Time</h2>
                  <h3 class="text-sm opacity-50">AlbumWriters</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="x w-full fixed bottom-0 z-40 justify-between text-white gap-4 p-4 bg-neutral-900 border-t border-t-neutral-800">
        <div class="x justify-between gap-4 items-center w-1/5">
          <div class="y">
            <span class="text-sm">Chaoz Airflow</span>
            <span class="opacity-75 text-xs">ParagonX9</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </div>
        <div class="y items-center gap-2 w-1/2">
          <div class="x items-center gap-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M15.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H7.5a.75.75 0 010-1.5h11.69l-3.22-3.22a.75.75 0 010-1.06zm-7.94 9a.75.75 0 010 1.06l-3.22 3.22H16.5a.75.75 0 010 1.5H4.81l3.22 3.22a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06 0z" clip-rule="evenodd" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
            </svg>
            <div class="rounded-full bg-white text-neutral-900 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clip-rule="evenodd" />
              </svg>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M12 5.25c1.213 0 2.415.046 3.605.135a3.256 3.256 0 013.01 3.01c.044.583.077 1.17.1 1.759L17.03 8.47a.75.75 0 10-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 00-1.06-1.06l-1.752 1.751c-.023-.65-.06-1.296-.108-1.939a4.756 4.756 0 00-4.392-4.392 49.422 49.422 0 00-7.436 0A4.756 4.756 0 003.89 8.282c-.017.224-.033.447-.046.672a.75.75 0 101.497.092c.013-.217.028-.434.044-.651a3.256 3.256 0 013.01-3.01c1.19-.09 2.392-.135 3.605-.135zm-6.97 6.22a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.752-1.751c.023.65.06 1.296.108 1.939a4.756 4.756 0 004.392 4.392 49.413 49.413 0 007.436 0 4.756 4.756 0 004.392-4.392c.017-.223.032-.447.046-.672a.75.75 0 00-1.497-.092c-.013.217-.028.434-.044.651a3.256 3.256 0 01-3.01 3.01 47.953 47.953 0 01-7.21 0 3.256 3.256 0 01-3.01-3.01 47.759 47.759 0 01-.1-1.759L6.97 15.53a.75.75 0 001.06-1.06l-3-3z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="x gap-2 items-center w-full px-8">
            <span class="text-xs">0:14</span>
            <input class="w-full" type="range">
            <span class="text-xs">4:12</span>
          </div>
        </div>
        <div class="x items-center gap-2 w-1/5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path d="M10 3.75a.75.75 0 00-1.264-.546L4.703 7H3.167a.75.75 0 00-.7.48A6.985 6.985 0 002 10c0 .887.165 1.737.468 2.52.111.29.39.48.7.48h1.535l4.033 3.796A.75.75 0 0010 16.25V3.75zM15.95 5.05a.75.75 0 00-1.06 1.061 5.5 5.5 0 010 7.778.75.75 0 001.06 1.06 7 7 0 000-9.899z" />
            <path d="M13.829 7.172a.75.75 0 00-1.061 1.06 2.5 2.5 0 010 3.536.75.75 0 001.06 1.06 4 4 0 000-5.656z" />
          </svg>
          <input type="range">
        </div>
      </div>
      <transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="transform opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="transform opacity-0">
        <div @click.self="this.$root.modal = false" v-if="modal" class="z-10 flex cursor-pointer justify-center top-0 items-center h-full w-full absolute bg-opacity-50 bg-black">
          <div class="cursor-auto shadow-2xl flex h-3/4 w-4/5 overflow-scroll rounded border border-neutral-400 dark:border-neutral-700">
            <nav class="y select-none space-y-2 p-2 text-neutral-700 dark:text-neutral-200 bg-neutral-50 dark:bg-neutral-900 border-r border-r-neutral-200 dark:border-r-neutral-800">
              <span class="text-xs font-bold uppercase opacity-50">Hyperbolus</span>
              <span @click="modalPage = 'settings'">Settings</span>
              <span @click="modalPage = 'updates'">Update</span>
              <span @click="modalPage = 'about'">About</span>
              <template v-if="this.$root.$data.config.debug">
                <span class="text-xs font-bold uppercase opacity-50">Debug</span>
                <span @click="modalPage = 'debug'">Debug</span>
                <span @click="modalPage = 'console'">Console</span>
              </template>
              <template v-if="this.$root.$data.config.developer">
                <span class="text-xs font-bold uppercase opacity-50">Developer</span>
                <span @click="modalPage = 'releases'">Releases</span>
              </template>
            </nav>
            <main class="overflow-scroll w-full bg-neutral-200 dark:bg-neutral-800">
              <home v-if="modalPage === 'about'"/>
              <debug-menu v-if="modalPage === 'debug'"/>
              <console v-if="modalPage === 'console'"/>
              <updates v-if="modalPage === 'updates'"/>
              <settings v-if="modalPage === 'settings'"/>
              <release v-if="modalPage === 'releases'"/>
              <zenshen v-if="modalPage === 'zenshen'"/>
            </main>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import {appWindow, LogicalSize} from '@tauri-apps/api/window'
import {window} from "@tauri-apps/api";
import {readDir, readTextFile, writeFile, writeTextFile} from "@tauri-apps/api/fs";
import Home from "@/views/Hyperbolus/About";
import Release from "@/views/Hyperbolus/Release";
import Settings from "@/views/Hyperbolus/Settings";
import Console from "@/views/Hyperbolus/Console";
import DebugMenu from "@/views/Hyperbolus/Debug";
import Updates from "@/views/Hyperbolus/Updates";
import {checkUpdate, installUpdate} from "@tauri-apps/api/updater";
import {getName, getVersion} from "@tauri-apps/api/app";
import {ask} from "@tauri-apps/api/dialog";
import {relaunch} from "@tauri-apps/api/process";
import Zenshen from "@/views/Hyperbolus/Zenshen";

export default {
  components: {
    Zenshen,
    Updates,
    Home,
    Release,
    Settings,
    Console,
    DebugMenu,
  },
  data() {
    return {
      launchStage: 2,

      menuMode: 0,
      pageName: 'MelodyKit',

      modal: false,
      modalPage: '',

      socket: null,
      console: '',

      secretWord: '',

      config: {},
      configAutoSave: true,
      configChanged: false,
    }
  },
  watch: {
    config: {
      handler: async function(newData) {
        if(this.configAutoSave) {
          await this.configWrite(newData);
          this.configChanged = false;
        } else {
          this.configChanged = true;
        }
        this.toggleDarkMode(newData.darkMode);
      },
      deep: true,
      //immediate: true
    }
  },
  async beforeMount() {
    try {
      const {shouldUpdate, manifest} = await checkUpdate()
      if (shouldUpdate) {
        let name = await getName();
        let version = await getVersion();
        if (await ask(`${name} ${manifest.version} is now available -- you have ${version}\n\nWould you like to install it now?\n\nRelease Notes:\n${manifest.body}`, 'New Update!')) {
          await installUpdate()
          await relaunch()
        }
      }
    } catch (error) {
      console.log(error)
    }
  },
  async beforeCreate() {
    await window.appWindow.setMinSize(new LogicalSize(750, 480));
    await this.configLoad();
    this.toggleDarkMode(this.config.darkMode);
    document.getElementById('app').classList.remove('opacity-0');
  },
  methods: {
    async configLoad() {
      const appdata = await readDir('', { dir: 18, recursive: true });
      let config = false;
      for (const entry of appdata) {
        let path = entry.path.split('\\');
        if (path[path.length - 1] === 'config.json') {
          config = true;
        }
      }
      if (config) {
        this.config = JSON.parse(await readTextFile('config.json', {dir: 18}));
      } else {
        let config = {
          version: 0,
          darkMode: false,
          supportButton: true,
          feedbackButton: false,
        };
        await writeTextFile('config.json', JSON.stringify(config, null, 4), { dir: 18 });
        await this.configLoad();
      }

    },
    getServer() {
      return this.config.server ?? 'https://hyperbol.us/';
    },
    async configWrite() {
      return await writeFile({contents: JSON.stringify(this.config, null, 4), path: 'config.json'}, { dir: 18 });
    },
    async pause(ms) {
      return new Promise(res => setTimeout(res, ms));
    },
    toggleDarkMode(set = null) {
      if (set != null) {
        if (set) {
          document.getElementById('app').classList.add('dark')
        } else {
          document.getElementById('app').classList.remove('dark')
        }
      } else {
        document.getElementById('app').classList.toggle('dark')
      }
    },
    async ctrl(mode) {
      switch(mode) {
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
    },
    back() {
      if (document.getElementById('vault').classList.contains('_bounce-in-top')) {
        this.toggleVault();
      } else if(this.modal) {
        this.modal = false;
      } else {
        this.$router.back();
      }
    }
  }
}
</script>
<style>
::-webkit-scrollbar {
  width: 1px;
  height: 1px;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 1);
}
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 1);
}
</style>