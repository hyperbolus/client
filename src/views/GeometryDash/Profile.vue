<template>
  <layout-standard>
    <template v-if="profile != null && posts != null">
      <div class="x gap-2">
        <div>
          <h1 class="font-bold text-4xl mb-2">{{ profile.username }}</h1>
          <div class="x space-x-2">
            <span>Stars: {{ profile.stars }}</span>
            <span>Diamonds: {{ profile.diamonds }}</span>
            <span>User Coins: {{ profile.userCoins }}</span>
            <span>Coins: {{ profile.coins }}</span>
            <span>Demons: {{ profile.demons }}</span>
            <span>Creator Points: {{ profile.cp }}</span>
          </div>
        </div>
      </div>
      <div class="x gap-2">
        <div class="w-1/2 space-y-2">
          <h2 class="font-bold text-xl border-b dark:border-b-neutral-700">Posts</h2>
          <span v-if="!posts" class="dark:text-neutral-600">No Posts</span>
          <round-box v-else v-for="(post, index) in posts" v-bind:key="index">
            <p class="mb-1">{{ post.content }}</p>
            <hr class="dark:border-neutral-700"/>
            <div class="flex flex-row justify-between">
              <span class="text-sm text-neutral-400">{{ post.username }}</span>
              <span class="text-sm text-neutral-400">{{ post.date }}</span>
            </div>
          </round-box>
        </div>
        <div class="w-1/2 space-y-2">
          <h2 class="font-bold text-xl border-b dark:border-b-neutral-700">Levels</h2>
          <span v-if="!levels" class="dark:text-neutral-600">No Levels</span>
          <router-link :to="'/gd/level/' + level.id" v-else v-for="(level, index) in levels" v-bind:key="index" class="y box box-shadow">
            <p class="mb-1 font-bold text-lg">{{ level.name }}</p>
            <hr class="dark:border-neutral-700"/>
            <span class="text-sm text-neutral-400">{{ level.description }}</span>
          </router-link>
        </div>
      </div>
    </template>
    <template v-else>
      <h1 class="font-bold text-4xl">Loading...</h1>
    </template>
  </layout-standard>
</template>
<script>

import LayoutStandard from "@/components/LayoutStandard";
import RoundBox from "@/components/RoundBox";
export default {
  name: 'Profile',
  components: {RoundBox, LayoutStandard},
  data() {
    return {
      profile: null,
      posts: null,
      videos: null,
      levels: null,
      paneLeft: 0,
      paneRight: 0
    }
  },
  async beforeMount() {
    await fetch("https://browser.gdps.io/api/profile/" + this.$route.params.name)
        .then(res => res.json())
        .then(data => this.profile = data);

    await fetch("https://browser.gdps.io/api/comments/" + this.profile.accountID + "?type=profile")
        .then(res => res.json())
        .then(data => this.posts = data);

    await fetch("https://browser.gdps.io/api/search/" + this.profile.playerID + "?user")
        .then(res => res.json())
        .then(data => this.levels = data);
  }
}
</script>
