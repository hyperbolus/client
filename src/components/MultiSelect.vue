<template>
  <select v-model="value" class="h-full rounded border border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900" multiple>
    <slot/>
  </select>
</template>
<script>
export default {
  name: 'MultiSelect',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>