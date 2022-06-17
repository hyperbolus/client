<template>
  <layout-standard title="Debug Console">
    <div class="text-xs rounded bg-black text-white">
      <div id="concon" ref="container" class="p-2 overflow-y-scroll" style="height: calc(10rem)">
        <pre ref="console" data-console>{{ this.$root.$data.console }}</pre>
      </div>
      <div class="flex flex-row items-center p-2 rounded-b border-t border-t-neutral-800 w-full bg-black">
        <span class="select-none mr-1">$</span><input @keydown.enter="handleConsole"
                                                      class="p-0 text-xs font-mono border-0 ring-0 focus:ring-0 focus:border-0 border-0 w-full bg-transparent"
                                                      type="text"/>
      </div>
    </div>
  </layout-standard>
</template>
<script>
import LayoutStandard from "@/components/LayoutStandard";

export default {
  components: {LayoutStandard},
  data() {
    return {
      commands: {
        "help": {
          description: "Prints available commands",
          action: () => {
            this.log('Available Commands:\n');
            for (let cmd in this.commands) {
              this.log(cmd + "\t\t" + this.commands[cmd].description);
            }
          }
        },
        "clear": {
          description: "Clears the console",
          action: () => {
            this.clear();
          }
        },
        "config": {
          description: "Prints app config",
          action: () => {
            this.log('config.json:\n' + JSON.stringify(this.$root.$data.config, null, 4));
          }
        },
        "eval": {
          description: "Evaluates JavaScript",
          action: (args) => {
            args.shift();
            this.log(eval(args.join()));
          }
        },
        "send": {
          description: "Sends a message to the WebSocket server",
          action: (args) => {
            args.shift();
            window.socket.send(args.join(' '))
            this.log('Sent `' + args.join(' ') + '` to server');
          }
        }
      }
    }
  },
  methods: {
    handleConsole(e) {
      this.log('$ ' + e.target.value);
      let args = e.target.value.split(' ');
      if (args[0] in this.commands) {
        this.commands[args[0]].action(args)
      } else {
        this.log('Command not found')
      }
      e.target.value = ''
      setTimeout(() => {
        document.getElementById('concon').scrollTop = document.getElementById('concon').scrollHeight;
      }, 0);
    },
    log(data) {
      this.$root.$data.console += data + "\n";
    },
    clear() {
      this.$root.$data.console = "";
    }
  },
  mounted() {
    this.$root.$data.console = "Hyperbolus Console v0.1\n\ntype `help` for a list of commands\n"
  }
}
</script>
<style scoped>
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 1);
}
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0);
}
</style>