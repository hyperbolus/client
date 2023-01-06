<template>
  <layout-standard title="Home">
    <div class="x gap-2">
      <div style="max-height: calc(100vh - 10.5rem)" class="w-2/3 overflow-y-scroll p-4 rounded bg-neutral-100 dark:bg-neutral-900">
        <h1 class="font-bold text-2xl dark:text-white">Welcome!</h1>
        <span class="border-b border-b-neutral-300 dark:border-b-neutral-600 mt-1 mb-3 block"></span>
        <p class="-mt-2">Hello! Welcome to the GD section of this user test. No home page content for now so
          lets use this as a project whiteboard.</p>
        <p class="text-xs opacity-75">TL;DR for below: topics include unveiling the profile system, proposal for fixing
          the NONG situation, progress with the database browser page, ideas for a video database, and more! If you have
          any questions, please join our Discord! --&gt;</p>
        <h1 class="font-bold text-2xl dark:text-white">Notes</h1>
        <span class="border-b border-b-neutral-300 dark:border-b-neutral-600 mt-1 mb-1 block"></span>
        <h1 class="font-bold dark:text-white">Launch Page</h1>
        <p>Ahahaha I was so proud of myself to get this working. Even though it's really actually simple on the back-end
          I'm still proud of getting it all working together considering the goals I set myself and how I went about
          the learning process to achieve them. HUGE thanks to matcool for helping me figure out the hooking code to
          make the save switcher work. GDPS support I also got pretty much for free by hooking a different function.
          Custom executables and mods required to make GDPSes work aren't perfect so I am working on a sort of "modpack"
          format for importing profiles. Save managing needs a bit more work, I'd also like to add regular save backups
          since saves fucking suck. Wylie is working on a better save file project allegedly so I would love to support
          that.</p>
        <h1 class="font-bold dark:text-white">Browser Page</h1>
        <p>So, browser page is working! Only for levels right now though. There is an experimental toggle switch to search
          the descriptions of levels. It works in a limited capacity so no all levels are included. Next release I hope to
          finish adding the search options.</p>
        <h1 class="font-bold dark:text-white mt-2">Videos Page</h1>
        <p>I have pretty high hopes for this! I think it would be pretty useful. Not necessarily the page being
          here but the catalog system it uses. Each video can have a percent completion and level ID attached which
          can be used by others to quickly find gameplay videos for levels! When this is stable I will be releasing an
          API so other can benefit from this data. There are improvements to be made in the cataloging and verifying of,
          footage but I am happy with this as a proof-of-concept.</p>
        <h1 class="font-bold dark:text-white mt-2">Wiki Page</h1>
        <p>So this page fetches data from a MediaWiki instance at
          <a target="_blank" href="https://geometrydash.wiki" class="underline text-cyan-400">https://geometrydash.wiki</a>
          which I hope to add a lot of content to soon. I haven't completely figured out how navigation will work when in
          the app so I might instead just stick an iframe there and call it a day. After some testing and experimenting we
          will see. But I am leaning towards just embedding it. Another possibility is coding up a simple wiki system to
          also go with the GD Forums software, but we're getting ahead of ourselves now!</p>
        <h1 class="font-bold dark:text-white mt-2">Tools Page</h1>
        <p>Don't have much to say about this one. I asked a few people with cool web tools if I could include them in
          this project. I'd like to expand the list but also provide native alternatives for big ones. Maybe even have
          some facility for installing desktop apps related to GD like GD Share or
          <a target="_blank" href="https://loquibot.com" class="underline text-cyan-400">Loquibot</a>. Some of these
          might do better to instead be re-implemented (also for offline use) but others could be worth exploring
          integration.</p>
        <h1 class="font-bold dark:text-white mt-2">Music Page</h1>
        <p>Haha. Funny music player. I could add some code to read the save file and extract the song and artist names
          but that might interfere with future plans regarding save files, plus I have other tasks of higher importance.
          One thing I have been thinking about using this tab for is finally solving the NONG problem. My idea is to
          have users download youtube-dl (or dlp) and include a bundled mod as part of the Hyperbolus Core utility mod
          which needs to be active anytime you launch the game from this client. This mod would rewrite the song links
          with their NONG equivalent from a database where the level creator can freely edit. The difference here is
          that no audio is being stored on this database for legal reasons. Instead it only stores the link to a
          YouTube, SoundCloud, Newgrounds, etc. link and downloads it using youtube-dl. I think this would really clean
          up the NONG situation as well as being legally safe to operate since the end-users are downloading the songs.
          Of course I still might run into trouble so just to keep things fair, the database will need be to be
          monitored and also be able to accept DMCA or other types of reports for songs that are not normally free to
          download. This is as far as I can think, the fairest way to implement such a system. I still have some work to
          do regarding how the UX would work and the challenges I need to address with the tools I have available
          building this client. As well as the UX when it comes to downloading and installing the dependencies such as
          ffmpeg and the actual youtube-dl cli itself.</p>
      </div>
      <iframe style="height: calc(100vh - 10.5rem)" class="w-1/3 rounded bg-neutral-100 dark:bg-neutral-900" src="https://discord.com/widget?id=839698528170409996&theme=dark" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
    </div>
  </layout-standard>
</template>
<script>
import LayoutStandard from "@/components/LayoutStandard";
export default {
  name: 'Home',
  components: {LayoutStandard},
  mounted() {
    let els = document.querySelectorAll('[data-half-checked]');
    els.forEach(el => {
      el.indeterminate = true;
    })
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