<template>
  <button class="select-none rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow"><slot/></button>
</template>
<script>
export default {
  name: 'ButtonRound'
}
</script>