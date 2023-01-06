<template>
  <layout-standard title="Release Manager" class="flex flex-col space-y-2">
    <template #alt-header>
      <button-round v-if="page === 0" @click="page = 1">Submit Release</button-round>
      <button-round v-else @click="page = 0">Back to Release List</button-round>
    </template>
    <div v-if="page === 0">
      <span v-if="releases.length === 0">No releases</span>
      <template v-else>
        <div class="flex justify-between items-center grid grid-cols-8 px-2">
          <span class="font-bold">Version</span>
          <span class="font-bold col-span-2">Platform</span>
          <span class="font-bold col-span-4">Release Notes</span>
        </div>
        <div class="space-y-2">
          <div v-for="(release, index) in releases" :key="index" class="flex justify-between items-center grid grid-cols-8 rounded bg-neutral-300 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-600 py-1 px-2 text-neutral-700 dark:text-white">
            <span class="font-mono text-xs">{{ release.version }}</span>
            <span class="font-bold text-xs col-span-2">{{ release.platform }}</span>
            <span class="col-span-4">{{ release.release_notes }}</span>
            <span class="text-red-500 hover:text-red-600 hover:cursor-pointer" @click="deleteRelease(release.id)">Delete</span>
          </div>
        </div>
      </template>
    </div>
    <template v-else>
      <input ref="file" type="file" multiple/>
      <div class="flex justify-between gap-2">
        <select ref="platform" class="w-full rounded py-1 px-2 border border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900">
          <option value="windows-x86_64">Windows 64 Bit</option>
          <option value="darwin">MacOS</option>
        </select>
        <input ref="version" type="text" class="w-full rounded bg-neutral-300 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-600 py-1 px-2 text-neutral-700 dark:text-white placeholder-neutral-500" placeholder="Semantic Version"/>
      </div>
      <input ref="notes" type="text" class="rounded bg-neutral-300 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-600 py-1 px-2 text-neutral-700 dark:text-white placeholder-neutral-500" placeholder="Release notes"/>
      <input ref="key" type="password" :value="this.$root.$data.config.releaseKey" class="rounded bg-neutral-300 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-600 py-1 px-2 text-neutral-700 dark:text-white placeholder-neutral-500" placeholder="Release Key"/>
      <ButtonRound v-if="submitted" class="opacity-50 cursor-auto ">Submitting...</ButtonRound>
      <ButtonRound v-else @click="submit">Submit</ButtonRound>
      <span class="text-red-500">{{ error }}</span>
    </template>
  </layout-standard>
</template>
<script>
import LayoutStandard from "@/components/LayoutStandard";
import ButtonRound from "@/components/ButtonRound";
export default {
  components: {ButtonRound, LayoutStandard},
  data() {
    return {
      releases: [],
      page: 0,
      error: '',
      submitted: false,
    }
  },
  beforeMount() {
    this.getReleases();
  },
  methods: {
    getReleases() {
      fetch('https://hyperbol.us/api/releases' + '?key=' + this.$root.$data.config.releaseKey)
          .then(res => res.json())
          .then(data => this.releases = data)
    },
    deleteRelease(id) {
      fetch('https://hyperbol.us/api/releases/' + id + '?key=' + this.$root.$data.config.releaseKey, {
        method: 'DELETE',
      }).then(() => this.getReleases())
    },
    submit() {
      if (this.$refs.file.files.length !== 2) {
        this.error = "You must select the artifact and its .sig file";
        return 0;
      }
      if (this.$refs.version.value === '') {
        this.error = "You must specify a version";
        return 0;
      }
      this.submitted = true;
      let formData = new FormData();
      let reader = new FileReader();
      reader.readAsText(this.$refs.file.files[1]);
      reader.onload = (e) => {
        formData.append('artifact', this.$refs.file.files[0]);
        formData.append('signature', e.target.result.toString());
        formData.append('platform', this.$refs.platform.value);
        formData.append('version', this.$refs.version.value);
        if (!this.$refs.key.value) {
          this.$root.$data.config.releaseKey = this.$refs.key.value;
        }
        formData.append('key', this.$root.$data.config.releaseKey);
        formData.append('release_notes', this.$refs.notes.value);
        fetch(this.$root.config.server+'api/releases/upload', {
          method: 'POST',
          body: formData,
        })
            .then(res => res.json())
            .then(data => {
              if(data.code === 200) {
                this.getReleases()
                this.page = 0;
              } else {
                this.error = data.message;
              }
              this.submitted = false;
            });

      }
    }
  }
}
</script>