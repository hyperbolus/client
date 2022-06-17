<template>
  <div class="y text p-6">
    <template v-if="title">
      <div class="x items-center justify-between">
        <h1 class="text-neutral-700 dark:text-white text-3xl font-bold">{{ title }}</h1>
        <slot name="alt-header"/>
      </div>
      <horizontal-rule class="mt-2 mb-4"/>
    </template>
    <slot/>
  </div>
</template>
<script>
import HorizontalRule from "@/components/HorizontalRule";
export default {
  name: 'LayoutStandard',
  components: {HorizontalRule},
  props: ['title']
}
</script>