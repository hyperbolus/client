<template>
  <layout-standard title="Tools">
    <div class="y space-y-2">
      <tool-link to="/gd/tools/roulette" title="Extreme Demon Roulette" author="mat" description="Extreme demon roulette :)"/>
      <tool-link to="/gd/tools/explorer" title="Save Explorer" author="Colon" description="Explore your GD save data"/>
      <tool-link to="/gd/tools/comment" title="Comment Generator" author="Colon" description="Generate images of GD style comments"/>
      <tool-link to="/gd/tools/font" title="Font Generator" author="Colon" description="Generate images with GD fonts"/>
      <div>
        <h2 class="text-neutral-700 dark:text-white text-xl font-bold">Other Tools</h2>
        <span class="border-b border-b-neutral-300 dark:border-b-neutral-600 mt-1 block"></span>
      </div>
      <p>These are misc projects that are independent of Hyperbolus.</p>
      <a target="_blank" href="https://loquibot.com" class="x box box-shadow click items-center justify-between grow">
        <div>
          <h3 class="font-bold text-lg">Loquibot</h3>
          <span>By Alphaneous</span>
        </div>
        <external-link-icon class="w-8 h-8"/>
      </a>
      <a target="_blank" href="https://github.com/Spu7Nix/SPWN-language" class="x box box-shadow click items-center justify-between grow">
        <div>
          <h3 class="font-bold text-lg">SPWN Language</h3>
          <span>By Spu7nix & Contributors</span>
        </div>
        <external-link-icon class="w-8 h-8"/>
      </a>
      <a target="_blank" href="https://geode-sdk.github.io/docs/installation" class="x box box-shadow click items-center justify-between grow">
        <div>
          <h3 class="font-bold text-lg">Geode Developer Tools</h3>
          <span>By Geode Team</span>
        </div>
        <external-link-icon class="w-8 h-8"/>
      </a>
    </div>
  </layout-standard>
</template>
<script>
import LayoutStandard from "@/components/LayoutStandard";
import ToolLink from "@/components/ToolLink";
import { ExternalLinkIcon } from "@heroicons/vue/outline"

export default {
  name: "Tools",
  components: {
    ToolLink,
    LayoutStandard,
    ExternalLinkIcon
  },
}
</script>