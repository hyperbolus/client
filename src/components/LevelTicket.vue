<template>
  <round-box class="x justify-between items-center">
    <div class="x items-center space-x-2">
      <h2 class="font-bold text-2xl">{{ title }}</h2>
      <span class="text-sm">{{ subtitle }}</span>
    </div>
    <slot/>
  </round-box>
</template>
<script>
import RoundBox from "@/components/RoundBox";
export default {
  name: 'LevelTicket',
  components: {RoundBox},
  props: ['title', 'subtitle', 'body', 'inline']
}
</script>