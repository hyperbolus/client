<template>
  <div class="flex flex-col p-6 text-neutral-700 dark:text-neutral-200 relative h-full">
    <div class="flex flex-col items-center pb-2">
      <img src="@/assets/logo.png" class="w-1/4" alt="logo"/>
      <h1 class="font-black text-4xl">Hyperbolus</h1>
      <span>v{{ version }}</span>
      <div class="self-start">
        <h1 class="font-bold text-xl">Patrons</h1>
        <span class="border-b border-b-neutral-300 dark:border-b-neutral-600 mt-1 mb-2 block"></span>
        <div class="my-1 flex flex-wrap gap-2">
          <p>Nobody's here.</p>
          <a target="_blank" class="underline cursor-pointer" href="https://patreon.com/seebeyond" style="color: #FF424D">
            Maybe you could be the first...
          </a>
        </div>
        <h1 class="font-bold text-xl">Special Thanks</h1>
        <span class="border-b border-b-neutral-300 dark:border-b-neutral-600 mt-1 mb-2 block"></span>
        <div class="my-1 flex flex-wrap gap-2">
          <pill-label alt>matcool</pill-label>
          <pill-label alt>cos8o</pill-label>
          <pill-label alt>camila314</pill-label>
          <pill-label alt>poweredbypie</pill-label>
          <pill-label alt>Electro</pill-label>
          <pill-label alt>cvolton</pill-label>
          <pill-label alt>gdcolon</pill-label>
          <pill-label alt>nekit</pill-label>
          <pill-label alt>zmx</pill-label>
          <pill-label alt>ConfiG</pill-label>
          <pill-label alt>all the testers</pill-label>
          <pill-label alt>soundiscord</pill-label>
          <pill-label alt>gdp discord</pill-label>
          <span>&</span>
          <pill-label alt>you! <span class="text-red-500">&hearts;</span></pill-label>
        </div>
        <h1 class="font-bold text-xl">Technologies</h1>
        <span class="border-b border-b-neutral-300 dark:border-b-neutral-600 mt-1 mb-2 block"></span>
        <div class="my-1 flex flex-wrap gap-2">
          <pill-label alt>Tauri</pill-label>
          <pill-label alt>VueJS</pill-label>
          <pill-label alt>Tailwind</pill-label>
          <pill-label alt>Heroicons</pill-label>
          <pill-label alt>pnpm</pill-label>
          <pill-label alt>PhpStorm</pill-label>
          <pill-label alt>Blackjack</pill-label>
          <pill-label alt>Laravel</pill-label>
          <pill-label alt>Meilisearch</pill-label>
        </div>
      </div>
      <img @click="$root.toggleVault()" class="self-end w-4 -mr-4 hover:w-6 hover:-mt-1 hover:-mr-5 cursor-pointer" style="transition: all 0.25s cubic-bezier(.1, 1.97, 0.38, 0.25);" alt="Hm..." src="@/assets/gd/GJ_lock_001.png"/>
    </div>
  </div>
</template>
<script>
import {getVersion} from "@tauri-apps/api/app";
import PillLabel from "@/components/PillLabel";
export default {
  name: 'About',
  components: {PillLabel},
  data() {
    return {
      version: ''
    }
  },
  async beforeMount() {
    this.version = await getVersion();
  }
}
</script>
<style scoped>

</style>