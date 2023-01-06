<template>
  <layout-standard>
    <template v-if="level != null && comments != null">
      <h1 class="font-bold text-4xl">{{ level.name }}</h1>
      <router-link :to="'/gd/profile/' + level.author">By: {{ level.author }}</router-link>
      <p class="font-bold text-lg">{{ level.description }}</p>
      <div class="x gap-2 my-2 text-center">
        <div class="w-1/2 py-16 rounded bg-neutral-300 dark:bg-neutral-700">No Screenshots</div>
        <div class="w-1/2 py-16 rounded bg-neutral-300 dark:bg-neutral-700">No Gameplay Videos</div>
      </div>
      <nav class="x text-sm space-x-2 mb-2">
        <span @click="page = 0" class="click border-b border-b-neutral-300 dark:border-b-neutral-700 px-1">Comments</span>
        <span @click="page = 1" class="click border-b border-b-neutral-300 dark:border-b-neutral-700 px-1">Reviews</span>
        <span @click="page = 2" class="click border-b border-b-neutral-300 dark:border-b-neutral-700 px-1">Videos</span>
        <span @click="page = 3" class="click border-b border-b-neutral-300 dark:border-b-neutral-700 px-1">Screenshots</span>
      </nav>
      <div class="y space-y-2">
        <template v-if="page === 0">
          <round-box v-for="(comment, index) in comments" :key="index">
            <p class="mb-1">{{ comment.content }}</p>
            <hr class="dark:border-neutral-700"/>
            <div class="flex flex-row justify-between">
              <router-link :to="'/gd/profile/' + comment.username" class="hover:underline click text-sm text-neutral-400">{{ comment.username }}</router-link>
              <span class="text-sm text-neutral-400">{{ comment.date }}</span>
            </div>
          </round-box>
        </template>
        <template v-if="page === 1">
          <div>No Reviews</div>
        </template>
        <template v-if="page === 2">
          <div>No Videos</div>
        </template>
        <template v-if="page === 3">
          <div>No Screenshots</div>
        </template>
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
  name: 'Level',
  components: {RoundBox, LayoutStandard},
  data() {
    return {
      level: null,
      comments: null,
      reviews: null,
      videos: null,
      screenshots: null,
      page: 0
    }
  },
  async beforeMount() {
    await fetch("https://browser.gdps.io/api/level/" + this.$route.params.id)
        .then(res => res.json())
        .then(data => this.level = data);

    await fetch("https://browser.gdps.io/api/comments/" + this.$route.params.id)
        .then(res => res.json())
        .then(data => this.comments = data);
  }
}
</script>
