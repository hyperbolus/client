<template>
  <layout-standard title="Zenshen" class="space-y-2">
    <details open>
      <summary>Zenshen</summary>
      <textarea @keyup="parse" ref="source" class="text-sm font-mono dark:bg-neutral-900 rounded"></textarea>
    </details>
    <pre ref="inspector" class="text text-xs rounded bg-neutral-100 dark:bg-neutral-700 p-2"></pre>
    <div class="x gap-2">
      <button-round>Step</button-round>
      <button-round>Advance</button-round>
      <button-round>Play</button-round>
    </div>
  </layout-standard>
</template>
<script>
import LayoutStandard from "@/components/LayoutStandard";
import ButtonRound from "@/components/ButtonRound";

export default {
  name: 'Zenshen',
  components: {ButtonRound, LayoutStandard},
  data() {
    return {
      ast: [],
      modules: [],
      acc: null,
      dat: null,
      power: null,
      state: null
    }
  },
  methods: {
    parse() {
      let tokens = [];
      let stream = this.$refs.source.value.split('');
      for (let i = 0; i < stream.length; i++) {
        let token;
        if(stream[i].match(/[\n ]/g)) {
          continue;
        }
        tokens.push(token);
      }
      this.$refs.inspector.innerText = JSON.stringify(tokens, null, 2);
    },
    step() {

    }
  }
}
</script>