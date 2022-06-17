<template>
  <router-link :to="to">
    <div class="x box box-shadow click justify-between items-center">
      <div class="flex flex-row items-center space-x-2">
        <h2 class="font-bold text-2xl">{{ title }}</h2>
        <span class="text-sm">By {{ author }}</span>
      </div>
      <p>{{ description }}</p>
    </div>
  </router-link>
</template>
<script>
export default {
  name: 'ToolLink',
  props: ['title', 'author', 'description', 'to']
}
</script>