<template>
    <input type="text" v-model="value" class="grow rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-600 py-1 px-2 text-neutral-700 dark:text-white placeholder-neutral-500" :placeholder="placeholder"/>
</template>
<script>
export default {
  name: 'TextInput',
  props: ['modelValue', 'placeholder'],
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