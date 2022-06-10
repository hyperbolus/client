<template>
  <router-link :active-class="activeClass" :to="to"><slot/></router-link>
</template>
<script>
export default {
  props: {
    to: String,
    activeClass: String,
  }
}
</script>