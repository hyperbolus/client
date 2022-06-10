<template>
  <div class="flex flex-col p-6 text-neutral-700 dark:text-neutral-200">
    <template v-if="title">
      <div class="flex flex-row items-center justify-between">
        <h1 class="text-neutral-700 dark:text-white text-3xl font-bold">{{ title }}</h1>
        <slot name="alt-header"/>
      </div>
      <span class="border-b border-b-neutral-300 dark:border-b-neutral-600 mt-2 mb-4"></span>
    </template>
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'LayoutStandard',
  props: ['title']
}
</script>