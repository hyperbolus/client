<template>
  <layout-standard title="Console">
    <div class="text-xs rounded bg-black text-white">
      <pre class="p-2" ref="console" data-console>{{ this.$root.$data.console }}</pre>
      <div class="flex flex-row items-center p-2 rounded-b border-t border-t-neutral-800 w-full bg-black">
        <span class="select-none mr-1">$</span><input @keydown.enter="handleConsole" class="p-0 text-xs font-mono border-0 ring-0 focus:ring-0 focus:border-0 border-0 w-full bg-transparent" type="text"/>
      </div>
    </div>
  </layout-standard>
</template>
<script>
import LayoutStandard from "@/components/LayoutStandard";
export default {
  components: {LayoutStandard},
  methods: {
    handleConsole(e) {
      this.log('$ ' + e.target.value);
      let args = e.target.value.split(' ');
      switch (args[0]) {
        case 'help':
          this.log('Available Commands:\nhelp - print this page');
          break;
        case 'clear':
          this.clear();
          break;
        case 'config':
          this.log('config.json:\n'+JSON.stringify(this.$root.$data.config, null, 4));
          break;
        case 'eval':
          args.shift();
          this.log(eval(args.join()));
          break;
        case 'send':
          args.shift();
          window.socket.send(args.join(' '))
          this.log('Sent `' + args.join(' ') + '` to server');
          break;
        default:
          this.log('Command not found')
          break;
      }
      e.target.value = ''
    },
    log(data) {
      this.$root.$data.console += data + "\n";
    }
  },
  mounted() {
    this.$root.$data.console = "Hyperbolus Console v0.1\n\ntype `help` for a list of commands\n"
  }
}
</script>