<template>
  <div class="y click items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 bg-black">
    <!-- note: just like the Hyperbolus container, the overlay actually fills whole screen
     but its fine because title bar has raised z index. just something to keep in mind if
     the vertical centering isnt exact within the app's active content area. not worth using absolute
     top-6 and fighting the screen height which pokes out under the page :)-->
    <div class="y cursor-auto mt-7 w-2/3 min-h-4/5 box p-4 space-y-2">
      <slot/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ModalBox'
}
</script>