<template>
  <layout-standard title="Videos" class="space-y-2 h-full">
    <template #alt-header>
      <div class="flex items-center space-x-2">
        <template v-if="this.$root.$data.config.moderationKey">
          <span>Show Unpublished:</span>
          <Toggle v-model="this.$root.$data.config.showUnpublishedVideos"/>
        </template>
        <button-round @click="this.getVideos(this.type)">Refresh</button-round>
        <button-round @click="openModal">Upload</button-round>
      </div>
    </template>
    <div v-if="false" class="flex space-x-1 items-center">
      <button-round-small>Gameplay</button-round-small>
      <button-round-small>Showcase</button-round-small>
      <button-round-small>Highlights</button-round-small>
      <button-round-small>News</button-round-small>
      <button-round-small>Documentary</button-round-small>
      <button-round-small>Programming</button-round-small>
      <button-round-small>Misc</button-round-small>
    </div>
    <span v-if="loading === true">Loading...</span>
    <span v-else-if="videos.length === 0">Nothin' here, bud.</span>
    <div v-else class="pt-2 gap-4 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <round-box v-for="(video, index) in videos" :key="index" class="min-w-sm max-w-lg inline-block flex-col relative">
        <a target="_blank" :href="'https://youtu.be/' + video.url" class="grow cursor-pointer">
          <!--<img alt="thumbnail" :src="'https://img.youtube.com/vi/' + video.url + '/mqdefault.jpg'"/>-->
          <iframe style="zoom: 0.5; transform: scale(0.5); transform-origin: 0 0; width: 200%; height: 200%; margin-bottom: 30%;" :src="'https://www.youtube.com/embed/' + video.url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </a>
        <div class="flex justify-between">
          <span></span>
          <span>{{ video.username }}</span>
        </div>
        <div v-if="this.$root.$data.config.moderationKey" class="flex space-x-1 absolute left-0 top-0 -mt-3 justify-center w-full">
          <button-round-small @click="setPublished(index, false)" v-if="video.published === 'true'" class="text-xs">Unpublish</button-round-small>
          <button-round-small @click="setPublished(index, true)" v-else class="text-xs">Publish</button-round-small>
          <button-round-small class="text-xs">Edit</button-round-small>
          <button-round-small @click="deleteVideo(index)" class="text-xs" textcolor="text-red-500">Delete</button-round-small>
        </div>
      </round-box>
    </div>
    <modal-box v-if="modal" @click.self="modal = false">
      <h1 class="font-bold text-2xl">Submit a Video</h1>
      <label class="flex flex-col">
        <span class="ml-2">YouTube Video ID</span>
        <text-input v-model="form.video_id" placeholder="_6mT9DJZ6FU"/>
      </label>
      <label class="flex flex-col">
        <span class="ml-2">Level ID (optional)</span>
        <text-input v-model="form.level_id" placeholder="429491"/>
      </label>
      <label class="flex flex-col">
        <span class="ml-2">Account ID (optional)</span>
        <text-input v-model="form.account_id" placeholder="5941595"/>
      </label>
      <button-round @click="submit">Submit</button-round>
    </modal-box>
  </layout-standard>
</template>
<script>
import LayoutStandard from "@/components/LayoutStandard";
import RoundBox from "@/components/RoundBox";
import ButtonRoundSmall from "@/components/ButtonRoundSmall";
import ButtonRound from "@/components/ButtonRound";
import ModalBox from "@/components/ModalBox";
import TextInput from "@/components/TextInput";
import Toggle from "@/components/Toggle";

export default {
  name: 'Videos',
  components: {Toggle, TextInput, ModalBox, ButtonRound, ButtonRoundSmall, RoundBox, LayoutStandard},
  data() {
    return {
      videos: [],
      loading: false,
      type: 0,
      modal: false,
      form: {},
    }
  },
  methods: {
    getVideos(category = 0) {
      this.loading = true;
      this.videos = [];
      fetch('http://dashgd.test/api/videos?category=' + category + '&published=' + !this.$root.$data.config.showUnpublishedVideos)
          .then(res => res.json())
          .then(data => {
            this.videos = data.data;
            this.loading = false;
          })
    },
    submit() {
      const params = new URLSearchParams({
        video_id: this.form.video_id,
        level_id: this.form.level_id,
        account_id: this.form.account_id,
      });
      fetch('http://dashgd.test/api/videos?' + params, {
        method: 'POST'
      }).then(res => res.json()).then(data => {
        this.getVideos();
        alert(data.message);
        this.modal = false;
      })
    },
    setPublished(index, published) {
      fetch('http://dashgd.test/api/videos/' + this.videos[index].id + '?published=' + published + '&key=' + this.$root.$data.config.moderationKey, {
        method: 'PATCH'
      }).then(res => res.json()).then(() => {
        this.videos[index].published = published.toString();
      })
    },
    deleteVideo(index) {
      fetch('http://dashgd.test/api/videos/' + this.videos[index].id + '?key=' + this.$root.$data.config.moderationKey, {
        method: 'DELETE'
      }).then(res => res.json()).then(() => {
        this.videos.splice(index, 1)
      })
    },
    openModal() {
      this.form = {
        video_id: '',
        level_id: '',
        account_id: ''
      };
      this.modal = true;
    },
  },
  watch: {
    showUnpublished() {
      this.getVideos(this.type, this.showUnpublished)
    },
    type() {
      this.getVideos(this.type, this.showUnpublished)
    }
  },
  beforeMount() {
    this.getVideos(this.type, this.$root.$data.config.showUnpublishedVideos);
  }
}
</script>