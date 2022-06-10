<template>
  <layout-standard title="Texture Packs">
    <div class="flex flex-col space-y-4">
      <mod-item name="BetterInfo" author="Cvolton" description="A really cool mod! You should totally download this mod! It's my favorito moddo lolo."/>
      <mod-item name="BetterEdit" author="HJFod" description="GD Editor overhaul"/>
      <mod-item name="GD Rich Presence" author="zmx" description="Gives you Discord rich status messages"/>
    </div>
  </layout-standard>
</template>
<script>
import ModItem from "@/views/GeometryDash/ModItem";
import LayoutStandard from "@/components/LayoutStandard";

export default {
  name: "Textures",
  components: {LayoutStandard, ModItem},
}
</script>