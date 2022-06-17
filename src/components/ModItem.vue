<!--<template>
  <div class="rounded-lg bg-neutral-100 dark:bg-neutral-700 py-2 px-4 text-neutral-700 dark:text-white flex flex-row justify-between items-center shadow hover:shadow-lg transition transition-shadow">
    <div>
      <div class="flex flex-row items-center space-x-2">
        <h2 class="font-bold text-2xl">{{ name }}</h2>
        <span class="text-sm">By {{ author }}</span>
      </div>
      <p>{{ description }}</p>
    </div>
    <div class="bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-600 items-center p-2 mr-2 h-fit rounded transition transition-colors text-neutral-700 dark:text-neutral-200">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </div>
  </div>
</template>-->
<template>
  <div class="bg-neutral-100 dark:bg-neutral-900 rounded border border-neutral-400 dark:border-neutral-700 py-2 px-4 text-neutral-700 dark:text-white flex flex-row justify-between items-center shadow hover:shadow-lg transition transition-shadow">
    <div>
      <div class="flex flex-row items-center space-x-2">
        <h2 class="font-bold text-2xl">{{ name }}</h2>
        <span class="text-sm">By {{ author }}</span>
      </div>
      <p>{{ description }}</p>
    </div>
    <div class="bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-600 items-center p-2 mr-2 h-fit transition transition-colors text-neutral-700 dark:text-neutral-200">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </div>
  </div>
</template>
<script>

export default {
  name: "ModItem",
  props: ['id', 'name', 'author', 'description']
}
</script>