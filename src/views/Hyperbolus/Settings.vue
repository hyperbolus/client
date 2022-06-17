<template>
  <layout-standard title="Settings">
    <div class="space-y-4 max-w-xl">
      <div class="flex flex-row justify-between items-center">
        <span>Dark Mode</span>
        <Toggle v-model="this.$root.$data.config.darkMode"/>
      </div>
      <div class="flex flex-row justify-between items-center">
        <span>Feedback Button</span>
        <Toggle v-model="this.$root.$data.config.feedbackButton"/>
      </div>
      <div class="flex flex-row justify-between items-center">
        <span>Support Button</span>
        <Toggle v-model="this.$root.$data.config.supportButton"/>
      </div>
    </div>
  </layout-standard>
</template>
<script>
import LayoutStandard from "@/components/LayoutStandard";
import Toggle from "@/components/Toggle";

export default {
  components: {Toggle, LayoutStandard}
}
</script>