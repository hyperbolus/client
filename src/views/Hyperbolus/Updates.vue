<template>
  <layout-standard title="Updates">
    <button-round v-if="checking" class="cursor-auto opacity-50">Checking...</button-round>
    <button-round v-else @click="checkForUpdates">Check for Updates</button-round>
  </layout-standard>
</template>
<script>
import LayoutStandard from "@/components/LayoutStandard";
import {checkUpdate, installUpdate} from "@tauri-apps/api/updater";
import ButtonRound from "@/components/ButtonRound";
import {relaunch} from "@tauri-apps/api/process";
import {ask} from "@tauri-apps/api/dialog";
import {getName, getVersion} from "@tauri-apps/api/app";

export default {
  components: {ButtonRound, LayoutStandard},
  data() {
    return {
      checking: false,
    }
  },
  methods: {
    async checkForUpdates() {
      this.checking = true;
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
      this.checking = false;
    }
  }
}
</script>