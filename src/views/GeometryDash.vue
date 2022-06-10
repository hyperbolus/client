<template>
  <div class="flex flex-row">
    <!-- Vertical Nav Bar -->
    <nav class="flex flex-col z-10 text-neutral-700 dark:text-neutral-200 justify-between bg-neutral-50 dark:bg-neutral-900 py-4 border-r border-r-neutral-200 dark:border-r-neutral-800">
      <div class="flex flex-col space-y-6 px-3">
        <NavLink to="/gd">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </NavLink>
        <!--
        <NavLink to="/gd/textures">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </NavLink>
        <NavLink to="/gd/mods">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
          </svg>
        </NavLink>
        -->
        <NavLink to="/gd/tools">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </NavLink>
        <NavLink to="/gd/browser">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        </NavLink>
        <!--
        <NavLink to="/gd/videos">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
        </NavLink>
        <NavLink to="/gd/wiki">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </NavLink>
        -->
        <NavLink to="/gd/music">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </NavLink>
      </div>
      <NavLink to="/gd/launch" class="px-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </NavLink>
    </nav>
    <div class="flex flex-col w-full">
      <!-- Header -->
      <header class="flex flex-row space-x-4 p-1 px-4 justify-end bg-neutral-50 dark:bg-neutral-900 border-b border-b-neutral-200 dark:border-b-neutral-800">
        <Dropdown align="origin-top-right right-0" width="w-40">
          <template #trigger>
            <button type="button" class="mt-1.5 inline-flex items-center text-sm font-medium rounded-md text-neutral-700 dark:text-neutral-200 hover:text-neutral-300 transition ease-in-out duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </button>
          </template>
          <template #content>
            <DropdownLink to="#">Profile</DropdownLink>
            <hr class="my-1"/>
            <DropdownLink to="#">Profile</DropdownLink>
            <hr class="my-1"/>
            <DropdownLink to="#">Profile</DropdownLink>
            <hr class="my-1"/>
            <DropdownLink to="#">Profile</DropdownLink>
            <hr class="my-1"/>
            <DropdownLink to="#">Profile</DropdownLink>
            <hr class="my-1"/>
            <DropdownLink to="#">Profile</DropdownLink>
          </template>
        </Dropdown>
        <Dropdown align="origin-top-right right-0" width="w-40">
          <template #trigger>
            <button type="button" class="mt-1.5 inline-flex items-center text-sm font-medium rounded-md text-neutral-700 dark:text-neutral-200 hover:text-neutral-300 transition ease-in-out duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </template>
          <template #content>
            <DropdownLink to="#">Profile</DropdownLink>
            <hr class="my-1"/>
            <DropdownLink to="#">Profile</DropdownLink>
            <hr class="my-1"/>
            <DropdownLink to="#">Profile</DropdownLink>
            <hr class="my-1"/>
            <DropdownLink to="#">Profile</DropdownLink>
            <hr class="my-1"/>
            <DropdownLink to="#">Profile</DropdownLink>
          </template>
        </Dropdown>
        <Dropdown align="origin-top-right right-0" width="w-40">
          <template #trigger>
            <button type="button" class="mt-2 inline-flex items-center text-sm font-medium rounded-md text-neutral-700 dark:text-neutral-200 hover:text-neutral-300 transition ease-in-out duration-150">
              RobTop<svg class="ml-1 -mr-0.5 -mb-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
            </button>
          </template>
          <template #content>
            <DropdownLink to="#">Profile</DropdownLink>
            <hr class="my-1"/>
            <DropdownLink to="#">Settings</DropdownLink>
            <DropdownLink to="#">Edit Theme</DropdownLink>
            <hr class="my-1"/>
            <DropdownLink to="#">Night Mode</DropdownLink>
            <DropdownLink to="#">English</DropdownLink>
            <hr class="my-1"/>
            <DropdownLink to="#" class="text-red-500 hover:text-white hover:bg-red-500">Logout</DropdownLink>
          </template>
        </Dropdown>
      </header>
      <main class="w-full h-full overflow-scroll bg-neutral-200 dark:bg-neutral-800">
        <router-view/>
      </main>
    </div>
  </div>
</template>
<script>
import NavLink from "@/components/NavLink";
import Dropdown from "@/components/Dropdown";
import DropdownLink from "@/components/DropdownLink";

export default {
  components: {
    DropdownLink,
    NavLink,
    Dropdown
  }
}
</script>