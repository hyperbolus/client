<template>
  <router-link class="text-black px-3 py-1 text-sm hover:bg-gray-200 transition ease-in-out duration-150" :to="to"><slot/></router-link>
</template>
<script>
export default {
  name: 'DropdownLink',
  props: {
    to: String,
  }
}
</script>