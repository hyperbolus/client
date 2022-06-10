<template>
  <layout-standard title="Settings">
    <button class="rounded bg-white dark:bg-neutral-700 px-2 py-1 mt-2" @click="this.$root.$data.config.darkMode = !this.$root.$data.config.darkMode">Toggle Dark Mode
    </button>
  </layout-standard>
</template>
<script>
import LayoutStandard from "@/components/LayoutStandard";

export default {
  components: {LayoutStandard}
}
</script>