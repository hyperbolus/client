<template>
  <button class="rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-sm shadow hover:shadow-lg transition transition-shadow" :class="textcolor"><slot/></button>
</template>
<script>
export default {
  name: 'ButtonRoundSmall',
  props: {
    textcolor: {
      default: 'text-neutral-700 dark:text-white',
      type: String
    }
  }
}
</script>