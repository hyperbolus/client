<template>
  <div>
    <canvas ref="canvas" class="w-full h-full"></canvas>
    <div class="absolute left-0 top-6">
      <details class="opacity-80 group m-2 relative max-w-lg rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-400 dark:border-neutral-700 text-neutral-700 dark:text-white" open>
        <summary class="px-1 bg-neutral-100 dark:bg-neutral-900 font-mono text-sm rounded group-open:rounded-b-none border-b-0 group-open:border-b border-neutral-400 dark:border-neutral-700">Debug Options</summary>
        <div class="flex flex-col px-2 py-2 space-y-2">
          <div class="flex flex-row items-center space-x-4">
            <span>Show Grid</span>
            <Toggle v-model="toggle"/>
          </div>
          <div class="font-mono uppercase text-sm">Cusor Position (grid): {{ cursorGridPos }}</div>
          <div class="flex flex-row space-x-4">
            <button @click="viewport.top = 0; viewport.left = 0;" class="rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">
              reset viewport
            </button>
            <button class="rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">ok bye</button>
          </div>
        </div>
      </details>
      <details class="opacity-80 group m-2 relative max-w-lg rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-400 dark:border-neutral-700 text-neutral-700 dark:text-white" open>
        <summary class="px-1 bg-neutral-100 dark:bg-neutral-900 font-mono text-sm rounded group-open:rounded-b-none border-b-0 group-open:border-b border-neutral-400 dark:border-neutral-700">Debug Options</summary>
        <div class="flex flex-col px-2 py-2 space-y-2">
          <div class="font-mono uppercase text-sm">{{ objectsContainer.children.length }}</div>
          <div class="flex flex-row space-x-4">
            <button @click="objectsContainer.removeChildren()" class="rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-700 py-1 px-2 text-neutral-700 dark:text-white shadow hover:shadow-lg transition transition-shadow">
              remove all objects
            </button>
          </div>
        </div>
      </details>
    </div>
  </div>
</template>
<script>
import Toggle from "@/components/Toggle";
import * as PIXI from 'pixi.js'
import {Viewport} from "pixi-viewport";

export default {
  name: 'Editor',
  components: {Toggle},
  methods: {
    drawPixi() {
      this.app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: true,
        transparent: false,
        view: this.$refs.canvas,
        backgroundColor: 0xc0ffee
      })

      this.viewport = new Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        worldWidth: 2000,
        worldHeight: 2000,
        interaction: this.app.renderer.plugins.interaction
      })

      // add the viewport to the stage
      this.app.stage.addChild(this.viewport)
/*
      const gridTexture = new PIXI.Texture.from(require('@/assets/grid.png'));
      const grid = new TilingSprite(gridTexture, 100, 100)
      this.viewport.addChild(grid)

      this.viewport.on('moved', () => {
        grid.tilePosition.y = -this.viewport.top
        grid.tilePosition.x = -this.viewport.left
        grid.y = this.viewport.top
        grid.x = this.viewport.left

        grid.width = innerWidth / this.viewport.scale.x
        grid.height = innerHeight / this.viewport.scale.y
      })*/

      this.viewport
          .drag()
          .pinch()
          .wheel()
          .decelerate()

      const sprite = this.viewport.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
      sprite.tint = 0xff0000
      sprite.width = sprite.height = 100
      sprite.position.set(0, -100)

      const basicText = new PIXI.Text('Basic text in pixi');
      basicText.x = 50;
      basicText.y = 100;

      this.viewport.addChild(basicText);

      this.viewport.fit()
      this.viewport.moveCenter(1000, 1000)

      const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: false,
        wordWrapWidth: 440,
        lineJoin: 'round',
      });

      const richText = new PIXI.Text('The debug toggle is currently set to ' + this.toggle, style);
      richText.x = 50;
      richText.y = 220;

      this.viewport.addChild(richText);

      const skewStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        dropShadow: true,
        dropShadowAlpha: 0.8,
        dropShadowAngle: 2.1,
        dropShadowBlur: 4,
        dropShadowColor: '0x111111',
        dropShadowDistance: 10,
        fill: ['#ffffff'],
        stroke: '#004620',
        fontSize: 60,
        fontWeight: 'lighter',
        lineJoin: 'round',
        strokeThickness: 12,
      });

      for(let i = 0; i < 10; i++) {
        const skewText = new PIXI.Text('SKEW IS COOL', skewStyle);
        skewText.skew.set(0.65, -0.3);
        skewText.anchor.set(0.5, 0.5);
        skewText.x = 300 * (i*10);
        skewText.y = 480;
        this.viewport.addChild(skewText);
      }

      const line = new PIXI.Graphics();
      this.viewport.addChild(line);

      this.viewport.addChild(this.objectsContainer);

      this.viewport.on('pointerdown', () => {
        let sprite = new PIXI.Sprite(PIXI.Texture.WHITE)
        this.objectsContainer.addChild(sprite)
        sprite.tint = 0xff0000
        sprite.width = sprite.height = 100
        sprite.position.set(this.cursorGridPos.x, this.cursorGridPos.y)
      });

      this.viewport.clampZoom({
        minScale: .05,
        maxScale: 10,
      })

      this.app.ticker.add(() => {
        let pos = this.app.renderer.plugins.interaction.mouse.global;
        let world = this.viewport.toWorld(pos.x, pos.y);

        sprite.position.x = this.cursorGridPos.x = Math.floor(world.x / 100) * 100;
        sprite.position.y = this.cursorGridPos.y = Math.floor(world.y / 100) * 100;
        richText.text = this.app.ticker.maxFPS;
      });
    },
  },
  data() {
    return {
      app: null,
      viewport: null,
      toggle: false,
      objectsContainer: new PIXI.Container(),
      cursorGridPos: {x: 0, y: 0}
    }
  },
  mounted() {
    this.drawPixi()
  }
}
</script>