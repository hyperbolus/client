<template>
  <div>
    <label v-for="(option, key) in options" :key="key" class="x items-center select-none text-lg leading-0"><input type="radio" :value="key" class="h-4 w-4 mr-2"/><span>{{ option }}</span></label>
  </div>
</template>
<script>
export default {
  name: 'RadioList',
  props: ['options']
}
</script>