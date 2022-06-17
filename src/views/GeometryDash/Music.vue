<template>
  <layout-standard title="Music">
    <template #alt-header>
      <img class="h-12 rounded" alt="dashify" src="../../assets/dashify.jpg"/>
    </template>
    <div class="flex w-full fixed bottom-0 left-0 pl-16 p-4 grid grid-cols-9 items-center justify-between border-t border-t-neutral-200 dark:border-t-neutral-800 bg-neutral-50 dark:bg-neutral-900">
      <div class="flex flex-col col-span-2">
        <span class="text-sm">Chaoz Impact</span>
        <span class="opacity-75 text-xs">ParagonX9</span>
      </div>
      <div class="flex flex-col items-center w-full col-span-5">
        <div class="space-x-2">
          <button-round @click="$refs.player.play()">Play</button-round>
          <button-round @click="$refs.player.pause()">Pause</button-round>
          <button-round @click="$refs.player.currentTime = 0">Restart</button-round>
        </div>
        <div class="flex space-x-1 w-full">
          <span>{{ pretty(time) }}</span>
          <input class="grow" @mousedown="scrubbing = true;" @input="scrub" @mouseup="this.$refs.player.currentTime = parseInt($refs.slider.value);scrubbing = false;" ref="slider" type="range" :value="time" step="1" min="0" :max="duration"/>
          <span>{{ pretty(duration) }}</span>
        </div>
      </div>
      <div class="col-span-2">
        <input class="float-right" type="range" step=".01" min="0" max="1" ref="volume" @input="$refs.player.volume = $refs.volume.value"/>
      </div>
    </div>
    <audio @timeupdate="updateSlider" id="player" ref="player" class="hidden"></audio>
    <div class="overflow-y-scroll space-y-2" style="max-height: calc(100vh - 16rem)">
      <div v-for="(song, index) in songs" v-bind:key="index" class="flex items-center space-x-2 border border-neutral-400 dark:border-neutral-700 bg-neutral-50 shadow rounded dark:bg-neutral-900 p-4">
        <button-round @click="play(song.path)">Play</button-round>
        <h2 class="font-bold text-2xl">{{ song.name }}</h2>
      </div>
    </div>
  </layout-standard>
</template>
<script>
import LayoutStandard from "@/components/LayoutStandard";
import ButtonRound from "@/components/ButtonRound";
import {readDir} from "@tauri-apps/api/fs";
import {convertFileSrc} from "@tauri-apps/api/tauri";

export default {
  name: 'Music',
  components: {ButtonRound, LayoutStandard},
  data() {
    return {
      songs: [],
      time: 0,
      duration: 0,
      scrubbing: false,
    }
  },
  async beforeMount() {
    this.songs = await readDir('GeometryDash', {dir: 5});
    this.songs = this.songs.filter(file => file.name.includes('.mp3'))
  },
  methods: {
    async play(song) {
      this.$refs.player.src = convertFileSrc(song);
      await this.$refs.player.play();
      this.duration = this.$refs.player.duration;
    },
    updateSlider(e) {
      if(!this.scrubbing) {
        this.time = e.target.currentTime;
      }
    },
    scrub(e) {
      this.time = parseInt(e.target.value);
    },
    pretty(time) {
      let sec_num = parseInt(time, 10);
      let hours   = Math.floor(sec_num / 3600);
      let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      let seconds = sec_num - (hours * 3600) - (minutes * 60);

      let output = '';
      if (hours > 0) {
        output += hours+':';
      }

      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}

      output += minutes+':'+seconds;
      return output;
    }
  },
}
</script>
<style scoped>
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 1);
}
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0);
}
</style>