<template>
  <div class="flex flex-row w-screen">
    <!-- Vertical Nav Bar -->
    <nav class="flex flex-col text-neutral-700 dark:text-neutral-200 justify-between bg-neutral-50 dark:bg-neutral-900 py-4 border-r border-r-neutral-200 dark:border-r-neutral-800">
      <div class="flex flex-col space-y-6 px-3">
        <NavLink to="/sd">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </NavLink>
        <NavLink to="/sd/library">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
          </svg>
        </NavLink>
      </div>
      <NavLink @click="launch" to="#" class="px-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </NavLink>
    </nav>
    <main class="w-full h-full overflow-scroll bg-neutral-200 dark:bg-neutral-800">
      <router-view/>
    </main>
  </div>
</template>
<script>
import NavLink from "@/components/NavLink";
import {open} from "@tauri-apps/api/shell";

export default {
  components: {
    NavLink,
  },
  methods: {
    launch() {
      open('steam://rungameid/1400910');
    }
  }
}
</script>