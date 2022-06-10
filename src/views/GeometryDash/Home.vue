<template>
  <layout-standard title="Hyperbolus: GD Public Test">
    <p class="max-w-xl -mt-2">Hello! Welcome to the GD section of this user test. No home page content for now so lets use this as a project whiteboard</p>
    <h1 class="font-bold text-xl dark:text-white">Roadmap</h1>
    <div class="ml-4">
      <h6 class="font-bold dark:text-white">Launch Profiles</h6>
      <div class="flex flex-col ml-4">
        <label><input type="checkbox" @click.prevent/> Standardize format</label>
        <label><input type="checkbox" @click.prevent/> ^ for easy profile sharing</label>
        <label><input type="checkbox" @click.prevent/> Resolve dependencies for imported profiles</label>
        <label><input type="checkbox" @click.prevent/> Relocate/isolate AppData directories for launch profiles</label>
      </div>
      <h6 class="font-bold dark:text-white">Modding</h6>
      <div class="flex flex-col ml-4">
        <label><input type="checkbox" @click.prevent data-half-checked/> Install mods</label>
        <div class="flex flex-col ml-4">
          <label><input type="checkbox" @click.prevent/> HyperDash SDK</label>
          <label><input type="checkbox" @click.prevent/> Geode SDK</label>
          <label><input type="checkbox" @click.prevent/> No SDK (your choice of DLL loader)</label>
        </div>
      </div>
      <h6 class="font-bold dark:text-white">Texture Packs</h6>
      <div class="flex flex-col ml-4">
        <label><input class="" type="checkbox" @click.prevent checked/> Download Packs</label>
        <label><input type="checkbox" @click.prevent/> Install Packs</label>
        <label><input type="checkbox" @click.prevent/> Texture Pack Manager (textureldr by pie)</label>
      </div>
      <h6 class="font-bold dark:text-white">Server Browser</h6>
      <div class="flex flex-col ml-4">
        <label><input type="checkbox" @click.prevent data-half-checked/> Search</label>
        <div class="flex flex-col ml-4">
          <label><input type="checkbox" @click.prevent checked/> Levels</label>
          <label><input type="checkbox" @click.prevent/> Level Filters</label>
          <label><input type="checkbox" @click.prevent/> Users</label>
        </div>
        <label><input type="checkbox" @click.prevent data-half-checked/> Levels</label>
        <label><input type="checkbox" @click.prevent data-half-checked/> Profiles</label>
        <label><input type="checkbox" @click.prevent/> Map Packs</label>
        <label><input type="checkbox" @click.prevent/> Demon / Challenge Lists</label>
        <label><input type="checkbox" @click.prevent/> GDPS Support</label>
      </div>
      <h6 class="font-bold dark:text-white">Tools</h6>
      <div class="flex flex-col ml-4">
        <label><input type="checkbox" @click.prevent checked/> Embed Web Pages</label>
        <label><input type="checkbox" @click.prevent/> Use Offline</label>
        <label><input type="checkbox" @click.prevent/> Native Executables (ie. loquibot)</label>
      </div>
    </div>
  </layout-standard>
</template>
<script>

import LayoutStandard from "@/components/LayoutStandard";
export default {
  name: 'Home',
  components: {LayoutStandard},
  mounted() {
    let els = document.querySelectorAll('[data-half-checked]');
    els.forEach(el => {
      el.indeterminate = true;
    })
  }
}
</script>
