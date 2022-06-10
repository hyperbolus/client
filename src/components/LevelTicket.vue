<template>
  <div class="bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-2 px-4 text-neutral-700 dark:text-white flex flex-row justify-between items-center shadow hover:shadow-lg transition transition-shadow">
    <div class="flex flex-row items-center space-x-2">
      <h2 class="font-bold text-2xl">{{ title }}</h2>
      <span class="text-sm">{{ subtitle }}</span>
    </div>
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'LevelTicket',
  props: ['title', 'subtitle', 'body', 'inline']
}
</script>