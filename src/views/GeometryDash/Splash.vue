<template>
  <div>
    <video id="bricks" @playing="this.go()" @click="this.go()" class="my-0 mx-auto w-screen" src="../../assets/bricks.webm" autoplay></video>
    <div id="terminal" spellcheck="false" style="transform: translate(0px, -37px); line-height: 1em;" class="whitespace-pre line-1 tty block fixed h-3/5 w-3/4 m-auto inset-x-0 inset-y-0 bg-transparent text-white overflow-hidden"></div>
  </div>
</template>

<script>
import { appWindow, LogicalSize } from '@tauri-apps/api/window'

export default {
  name: 'Splash',
  methods: {
    async pause(ms) {
      return new Promise(res => setTimeout(res, ms));
    },
    clear() {
      let terminal = document.getElementById('terminal');
      terminal.innerText = "";
    },
    async echo(text, delay = 0) {
      let terminal = document.getElementById('terminal');
      let lines = terminal.innerHTML.split(/\n/);
      if(lines.length > 24) {
        lines.shift();
        terminal.innerHTML = lines.join("\n");
      }
      terminal.innerHTML += text;
      if(delay !== 0) {
        await this.pause(delay);
      }
    },
    async type(text, delay, newline = true) {
      for (let i = 0; i < text.length; i++) {
        await this.echo(text[i], delay);
      }
      if(newline) {
        await this.echo("\n");
      }
    },
    el(text, classes) {
      let terminal = document.getElementById('terminal');
      let el = document.createElement('span');
      el.innerText = text;
      el.classList = classes;
      let lines = terminal.innerHTML.split(/\n/);
      if(lines.length > 24) {
        terminal.innerHTML = lines.join("\n");
        lines.shift();
      }
      terminal.append(el);
    },
    async go() {
      this.clear();
      //let video = document.getElementById('bricks');
      //video.play();
      await this.pause(3200);
      await this.type('Loading', 15, false);
      await this.type('...', 150);
      this.clear();
      await this.echo(' ██████╗ ███████╗ ██████╗ ██████╗ ███████╗███████╗██╗ ██████╗\n', 10);
      await this.echo('██╔════╝ ██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔════╝██║██╔════╝\n', 10);
      await this.echo('██║  ███╗█████╗  ██║   ██║██║  ██║█████╗  ███████╗██║██║     \n', 10);
      await this.echo('██║   ██║██╔══╝  ██║   ██║██║  ██║██╔══╝  ╚════██║██║██║     \n', 10);
      await this.echo('╚██████╔╝███████╗╚██████╔╝██████╔╝███████╗███████║██║╚██████╗\n', 10);
      await this.echo(' ╚═════╝ ╚══════╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝╚═╝ ╚═════╝\n', 10);
      await this.type('\n\t\t\tVersion v0.1 ', 10, false);
      await this.el('BETA', 'text-red-600');
      await this.echo('\n\n\n', 100);
      await this.type('Loading mods', 15, false);
      await this.type('...', 70);
      await this.type('BetterEdit*', 5);
      await this.type('Example Mod [', 2, false);
      await this.el('GEODE', 'text-green-500');
      await this.echo(']\n');
      await this.type('Lotus [', 2, false);
      await this.el('GEODE', 'text-green-500');
      await this.echo(']\n');
      await this.type('Low Capacity Fix*', 7);
      await this.echo('Clickable Green Usernames + Similar*\n', 5);
      await this.echo('Song Search*\n', 5);
      await this.echo('RGB Input*\n', 5);
      await this.echo('Menu Shaders*\n', 5);
      await this.type('Done loading mods! (7)\n[', 10, false);
      await this.el('WARN', 'text-red-600');
      await this.echo('] Could not identify an SDK for ');
      await this.el('6', 'text-green-500');
      await this.echo(' mods. There may be incompatibilities!\n');
      await this.pause(100);
      await this.type('Loading client extensions', 10, false);
      await this.type('...', 70);
      await this.echo('[', 5);
      await this.el('Lotus', 'text-blue-500');
      await this.echo('] by Spook & Lotus Team\n', 5);
      await this.type('\tClient mod found', 5);
      await this.type('\tConnected: api.lotus.gd\n[', 5, false);
      await this.el('MyDemonList', 'text-red-300');
      await this.echo(']\n', 5);
      await this.type('\tConnected: mydemonlist.com/api/v1', 5);
      await this.type('Done loading extensions!\n', 10);
      await this.type('...', 100, false);
      await this.type('.........', 30, false);
      await this.type('..', 150, false);
      await this.type('......', 50, false);
      await this.type('..............................................................', 5, false);
      this.$emit('done');
    }
  },
  async beforeMount() {
    await appWindow.setSize(new LogicalSize(880, 580))
    await appWindow.center();
  }
}
</script>
<style>
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0);
}
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0);
}
</style>