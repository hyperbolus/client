<template>
    <div class="relative" @click="value = !value">
      <label>
        <input type="checkbox" class="sr-only" v-model="value">
      </label>
      <div class="block bg-neutral-900 w-9 h-5 rounded-full transition-colors"  :class="value ? 'bg-green-400' : ''"></div>
      <div class="absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform" :class="value ? 'translate-x-full' : ''"></div>
    </div>
</template>
<script>
export default {
  name: 'Toggle',
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