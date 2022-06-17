<template>
  <span class="text-sm rounded px-1" :class="alt ? 'border border-neutral-300 dark:border-neutral-600 shadow bg-neutral-100 dark:bg-neutral-700' : 'bg-neutral-200 dark:bg-neutral-800'"><slot/></span>
</template>
<script>
export default {
  name: 'PillLabel',
  props: {
    alt: Boolean
  }
}
</script>