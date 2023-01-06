<template>
  <round-box class="h-fit shrink-0 grow-0 px-2">
    <img v-if="file.primaryScreenshot" class=" h-32" alt="screenshot" :src="file.primaryScreenshot.url"/>
    <img v-else class=" h-32" alt="screenshot" src="@/assets/sd_default.jpg"/>
    <h1 class="font-bold mt-2" :class="file.files[0].name.includes('.rar') ? 'text-red-500' : 'text-green-500'">{{ file.title }}</h1>
    <div class="flex flex-row items-center  text-neutral-500">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
      </svg>
      <span class="text-sm ml-1">{{ file.author.name }}</span>
    </div>
    <div class="flex flex-row justify-between items-center gap-2">
      <div class="flex flex-row items-center text-neutral-500 text-sm">
        <div class="flex flex-row items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          <span class="ml-1">{{ file.downloads }}</span>
        </div>
        <div class="ml-2 flex flex-row items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
          </svg>
          <span class="ml-1">{{ file.views }}</span>
        </div>
        <div class="ml-2 flex flex-row items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
          </svg>
          <span class="ml-1">{{ file.comments }}</span>
        </div>
      </div>
      <div onclick="alert('.rar files are currently unsupported and are in the process of being converted.\nThis level will be available to download in a future update.\nSorry for the inconvenience.')" v-if="file.files[0].name.includes('.rar')" class="shadow click text-red-500 p-2 click bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 transition transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <template v-else>
        <div v-if="downloading" class="p-2 bg-neutral-200 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 transition transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <div v-else @click="download" class="p-2 shadow click bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 transition transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </div>
      </template>
    </div>
  </round-box>
</template>
<script>
import {invoke} from "@tauri-apps/api/tauri";
import {Command} from "@tauri-apps/api/shell";
import {appDir} from "@tauri-apps/api/path";
import {createDir, removeFile} from "@tauri-apps/api/fs";
import RoundBox from "@/components/RoundBox";
import {v4 as uuidv4} from "uuid"

export default {
  name: "FilePreview",
  components: {RoundBox},
  props: ['file', 'pack'],
  data() {
    return {
      downloading: false
    }
  },
  methods: {
    async download() {
      this.downloading = true;
      let dir;
      if(this.pack) {
        dir = await appDir() + 'soundodger\\packs\\';
      } else {
        dir = await appDir() + 'soundodger\\levels\\';
      }
      const path = dir + uuidv4();
      await createDir(dir, {recursive: true});
      await invoke('fetch_file', {url: this.file.files[0].url, fileName: path});
      const cmd = new Command.sidecar('7za-22.00', [
          'x', path, '-o' + dir, '-y'
      ]);
      await cmd.execute().then(res => {
        console.log(res);
        this.downloading = false;
        removeFile(path);
      });
    }
  }
}
</script>