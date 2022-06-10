import { createRouter, createWebHashHistory } from 'vue-router'
import GeometryDash from "@/views/GeometryDash";
import GDHome from "@/views/GeometryDash/Home.vue";
import GDBrowser from "@/views/GeometryDash/Browser"
import GDTools from "@/views/GeometryDash/Tools"
import GDToolsRoulette from "@/views/GeometryDash/Tools/Roulette"
import GDToolsSaveExplorer from "@/views/GeometryDash/Tools/SaveExplorer"
import GDToolsComment from "@/views/GeometryDash/Tools/Comment"
import GDToolsFont from "@/views/GeometryDash/Tools/Font"
import GDLevel from "@/views/GeometryDash/Level"
import GDMods from "@/views/GeometryDash/Mods";
import GDWiki from "@/views/GeometryDash/Wiki";
import GDVideos from "@/views/GeometryDash/Videos";
import GDProfile from "@/views/GeometryDash/Profile";
import GDLaunch from "@/views/GeometryDash/Launch";
import GDTextures from "@/views/GeometryDash/Textures";
import GDEditor from "@/views/GeometryDash/Editor";
import GDMusic from "@/views/GeometryDash/Music";

import Soundodger from "@/views/Soundodger";
import SDHome from "@/views/Soundodger/Home.vue";
import SDLevels from "@/views/Soundodger/Levels";
import SDPacks from "@/views/Soundodger/Packs";
import SDLibrary from "@/views/Soundodger/Library";

import Hyperbolus from "@/views/Hyperbolus";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Hyperbolus
  },
  {
    path: '/gd/editor',
    name: 'GD Editor',
    component: GDEditor
  },
  {
    path: '/gd',
    name: 'GeometryDash',
    component: GeometryDash,
    children: [
      {
        path: '',
        name: 'GD Home',
        component: GDHome
      },
      {
        path: 'browser',
        name: 'GD Browser',
        component: GDBrowser
      },
      {
        path: 'mods',
        name: 'GD Mods',
        component: GDMods
      },
      {
        path: 'wiki',
        name: 'GD Wiki',
        component: GDWiki
      },
      {
        path: 'tools',
        name: 'GD Tools',
        component: GDTools,
      },
      {
        path: 'tools/roulette',
        name: 'GD Tools: Extreme Demon Roulette',
        component: GDToolsRoulette
      },
      {
        path: 'tools/explorer',
        name: 'GD Tools: Save Explorer',
        component: GDToolsSaveExplorer
      },
      {
        path: 'tools/comment',
        name: 'GD Tools: Comment Generator',
        component: GDToolsComment
      },
      {
        path: 'tools/font',
        name: 'GD Tools: Font Generator',
        component: GDToolsFont
      },
      {
        path: 'textures',
        name: 'GD Texture Packs',
        component: GDTextures
      },
      {
        path: 'launch',
        name: 'GD Launch',
        component: GDLaunch
      },
      {
        path: 'videos',
        name: 'GD Videos',
        component: GDVideos
      },
      {
        path: 'level/:id',
        name: 'GD Level',
        component: GDLevel
      },
      {
        path: 'profile/:name',
        name: 'GD Profile',
        component: GDProfile
      },
      {
        path: 'music',
        name: 'GD Music',
        component: GDMusic
      },
    ]
  },
  {
    path: '/sd',
    name: 'Soundodger',
    component: Soundodger,
    children: [
      {
        path: '',
        name: 'SD Home',
        component: SDHome
      },
      {
        path: 'levels',
        name: 'SD Levels',
        component: SDLevels
      },
      {
        path: 'packs',
        name: 'SD Packs',
        component: SDPacks
      },
      {
        path: 'library',
        name: 'SD Library',
        component: SDLibrary
      }
    ]
  }
]

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
//component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
