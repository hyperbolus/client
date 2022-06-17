<template>
  <Splash v-if="!doneLoading" @done="doneLoading = true"/>
  <div id="client" v-else class="y">
    <div id="vault" style="background: linear-gradient(#004A63, #00222D); transform: translateY(-100vh); transition: transform 0.4s ease-in-out;" class="pointer-events-none opacity-0 y items-center p-8 h-screen w-screen z-[35] fixed">
      <audio id="vault_audio" :src="require('@/assets/gd/mus.mp3')" loop></audio>
      <img class="h-10 my-4" alt="vault" :src="require('@/assets/gd/vault.png')"/>
      <input @keydown.enter="answerVault" ref="vaultinput" class="text-white p-2 rounded-lg border-0 focus:ring-0 bg-black bg-opacity-50" type="text"/>
      <div @click="answerVault" class="y items-center scale-75 hover:scale-100 pointer-events-none" style="transition: all 0.25s cubic-bezier(.1, 1.97, 0.38, 0.25);">
        <img class="w-1/2 pointer-events-auto" alt="vaultkeeper" :src="require('@/assets/gd/GJ_secretLock2_001.png')"/>
        <img class="w-1/4 pointer-events-auto -mt-9 -z-10" alt="vaultlock" :src="require('@/assets/gd/GJ_secretLock2_2_001.png')"/>
      </div>
      <button-round @click="toggleVault">Close Vault</button-round>
    </div>
    <div id="feedback" style="transform: translateX(100vw); transition: transform 0.5s ease-in-out;" class="pointer-events-none opacity-0 y items-center p-8 h-screen w-screen z-[36] bg-blue-300 fixed">

      <button-round @click="toggleFeedback">Close Feedback</button-round>
    </div>
    <div v-if="config.titlebar" data-tauri-drag-region class="z-40 dark:bg-neutral-900 bg-neutral-50 x text-neutral-700 dark:text-neutral-400 justify-between w-full fixed select-none border-b border-b-neutral-200 dark:border-b-neutral-800">
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
            </template>
            <hr class="border-neutral-200 dark:border-neutral-800"/>
            <span onclick="alert('Pretend this works :)')" class="hover:bg-red-500 text-red-500 hover:text-white py-0.5 px-1 text-left">
              Exit
            </span>
          </div>
        </div>
        <!--
         There is some SLIGHT color differences on the light mode
         with the border and bg for neutral-200 and it's driving
         me up the wall so i am just gonna ignore it, hope i forget,
         but leave this note so the knowledge isn't lost. sorry.
         note: it might be the shadow and z-index? investigate...
         -->
        <!-- Game Switcher -->
        <div @mouseover="menuMode = 1" @mouseleave="menuMode = 0">
          <div class="x items-center border-r border-r-neutral-200 dark:border-r-neutral-800 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700">
          <!-- Browser Tab Style: <div class="x items-center border-x border-x-neutral-200 dark:border-x-neutral-800 bg-neutral-200 dark:bg-neutral-800">-->
            <span class="text-xs px-1 py-1">{{ pageName }}</span>
          </div>
          <div v-if="menuMode === 1" class="y z-20 bg-neutral-50 dark:bg-neutral-900 top-6 absolute border border-neutral-200 dark:border-neutral-800 text-sm">
            <router-link @click="menuMode = 0; pageName = 'Geometry\xa0Dash'" to="/gd" class="hover:bg-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white py-0.5 px-1 text-left">Geometry Dash</router-link>
            <router-link @click="menuMode = 0; pageName = 'Soundodger'" to="/sd" class="hover:bg-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white py-0.5 px-1 text-left">Soundodger</router-link>
          </div>
        </div>
        <div v-if="config.supportButton" class="x items-center border-r border-r-neutral-200 dark:border-r-neutral-800 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700">
          <a target="_blank" href="https://patreon.com/seebeyond" class="text-xs px-1 py-1"><span class="text-red-500">&hearts;</span>&nbsp;Support</a>
        </div>
      </div>
      <div @auxclick="doneLoading = false" class="text-sm font-bold absolute" data-tauri-drag-region style="padding-top:1px;left: calc(50vw - 38px);">
        <span v-for="(char, index) in 'Hyperbolus'.split('')" :key="index" @click="secretFunction" class="hover:text-neutral-400 dark:hover:text-neutral-600 transition transition-colors">{{ char }}</span>
      </div>
      <div class="x justify-end">
        <div @click="toggleFeedback" v-if="config.feedbackButton" class="x items-center border-x border-x-neutral-200 dark:border-x-neutral-800 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700">
          <span class="text-xs px-1 py-1">Send&nbsp;Feedback</span>
        </div>
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

    <div class="pt-6 h-screen">
      <router-view class="h-full"/>
      <transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="transform opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="transform opacity-0">
        <div @click.self="this.$root.modal = false" v-if="modal" class="z-10 flex cursor-pointer justify-center top-0 items-center h-full w-full absolute bg-opacity-50 bg-black">
          <!-- note: there should be top-6 here ^^^ however since the title bar rests above the z index
           we can kinda ignore this and save the trouble of this container jutting out under the screen
           causing an extended scroll -->
          <div class="cursor-auto shadow-2xl flex h-3/4 w-4/5 overflow-scroll rounded border border-neutral-400 dark:border-neutral-700">
            <!-- Vertical Nav Bar -->
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
import PuzzleSound from '@/assets/puzzle.mp3'
import {readTextFile, writeFile} from "@tauri-apps/api/fs";
import Splash from "@/views/GeometryDash/Splash";
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
import ButtonRound from "@/components/ButtonRound";

export default {
  components: {
    ButtonRound,
    Updates,
    Splash,
    Home,
    Release,
    Settings,
    Console,
    DebugMenu,
  },
  data() {
    return {
      doneLoading: !false,

      menuMode: 0,
      pageName: 'Hyperbolus',

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
      return this.config = JSON.parse(await readTextFile('config.json', {dir: 18}));
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
    async secretFunction(e, animate = false) {
      if(!animate) {
        this.secretWord += e.target.innerText.toLowerCase();
        e.target.style.color = 'cyan';
        setTimeout(() => {
          e.target.style.color = '';
        }, 7000);
      }
      if (this.secretWord.includes('superb') || animate) {
        this.secretWord = '';
        this.menuMode = 2;
        this.config.debug = true;
        await this.pause(5)
        let tab = document.getElementById('devtab');
        tab.style.transitionDuration = '1s';
        tab.style.opacity = '0';
        tab.style.backgroundColor = 'cyan';
        tab.style.filter = 'blur(5px)';
        tab.style.textShadow = '0 0 3px cyan, 0 0 3px cyan, 0 0 3px cyan';
        tab.style.color = 'cyan';
        setTimeout(() => {
          tab.style.opacity = '1';
          tab.style.filter = '';
          tab.style.backgroundColor = '';
          tab.style.color = '';
          tab.style.textShadow = '0 0 0px transparent, 0 0 0px transparent, 0 0 0px transparent';
        }, 1000);
        let audio = new Audio(PuzzleSound);
        audio.volume = 0.3;
        await audio.play();
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
    toggleVault() {
      let el = document.getElementById('vault');
      let audio = document.getElementById('vault_audio');
      audio.volume = 0.8;
      let opt = el.classList.contains('_bounce-in-top');
      el.classList.toggle('_bounce-in-top');
      if(opt) {
        el.classList.add('pointer-events-none')
        setTimeout(() => el.style.transform = 'translateY(-100vh)', 10);
        setTimeout(() => el.classList.add('opacity-0'), 400);
        audio.pause();
        audio.currentTime = 0;
      } else {
        el.classList.remove('opacity-0');
        el.classList.remove('pointer-events-none');
        el.style.transform = 'translateY(0)';
        audio.play();
      }
    },
    toggleFeedback() {
      let el = document.getElementById('feedback');
      let opt = el.classList.contains('opacity-0');
      if(opt) {
        el.classList.remove('opacity-0');
        el.classList.remove('pointer-events-none');
        el.style.transform = 'translateX(0)';
      } else {
        el.classList.add('pointer-events-none');
        setTimeout(() => el.style.transform = 'translateX(100vw)', 10);
        setTimeout(() => el.classList.add('opacity-0'), 400);
      }
    },
    answerVault() {
      if(this.$refs.vaultinput.value.toLowerCase() === 'superb') {
        this.toggleVault();
        this.secretFunction(null, true);
      } else {
        this.$refs.vaultinput.value = '';
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
<style scoped>
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0);
}
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0);
}
@keyframes bounce-in-top {
  0% {
    transform: translateY(-500px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  38% {
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  55% {
    transform: translateY(-65px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  72% {
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  81% {
    transform: translateY(-28px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  90% {
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  95% {
    transform: translateY(-8px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  100% {
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
}
._bounce-in-top {
  animation: bounce-in-top 0.85s both;
}
</style>