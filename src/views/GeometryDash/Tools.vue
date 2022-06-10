<template>
  <layout-standard title="Tools">
    <div class="flex flex-col space-y-4">
      <tool-link to="/gd/tools/roulette" title="Extreme Demon Roulette" author="mat" description="Extreme demon roulette :)"/>
      <tool-link to="/gd/tools/explorer" title="Save Explorer" author="Colon" description="Explore your GD save data"/>
      <tool-link to="/gd/tools/comment" title="Comment Generator" author="Colon" description="Generate images of GD style comments"/>
      <tool-link to="/gd/tools/font" title="Font Generator" author="Colon" description="Generate images with GD fonts"/>
    </div>
  </layout-standard>
</template>
<script>
import LayoutStandard from "@/components/LayoutStandard";
import ToolLink from "@/components/ToolLink";
export default {
  name: "Tools",
  components: {ToolLink, LayoutStandard},
}
</script>