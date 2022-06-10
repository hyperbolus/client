<template>
  <div class="flex min-h-screen">
    <div class="bg-red-600 fixed top-0 left-0 select-none cursor-pointer print:hidden" data-tauri-drag-region>DRAG</div>
    <div class="flex flex-col text-white bg-slate-800 w-1/3 px-12 py-8">
      <div class="flex flex-col items-center my-4">
        <span class="bg-white rounded-full p-20"></span>
        <h1 class="font-bold text-2xl mt-2">0x1DEA</h1>
        <h2>Web Developer</h2>
      </div>
      <h6 class="font-bold">PROFILE</h6>
      <p>I am a self-taught web developer, designer, and programmer self taught since the age of 14</p>
      <h6 class="font-bold">SKILLS</h6>
      <ul class="list-disc list-inside mb-2">
        <li>Frontend Web Design & Programming</li>
        <li>Backend Web Programming</li>
        <li>Desktop Programming</li>
        <li>Vector and Image Manipulation (Photoshop / Illustrator)</li>
        <li>Audio Synthesis & Composition</li>
      </ul>
    </div>
    <div class="w-2/3 bg-slate-100 p-8">
      <h2 class="font-bold text-2xl">Work Experience</h2>
      <span>2019 - Present | Montaime Records LLC</span>
      <h2 class="font-bold text-2xl">Education</h2>
      <span>High School Diploma 2021</span>
      <p></p>
      <h2 class="font-bold text-2xl">Languages</h2>
      <p>(Most Proficient) PHP, JavaScript (Browser & Node), HTML, CSS, Java, Rust</p>
      <p>(Some Experience) SQL, TypeScript, C#, Python, C/C++</p>
      <h2 class="font-bold text-2xl">Frameworks & Libraries</h2>
      <p>Laravel, VueJS, TailwindCSS, Tauri, JQuery</p>
      <h2 class="font-bold text-2xl">Other</h2>
      <p>Windows, Mac, Ubuntu Linux, Visual Studio, PhpStorm, git, GitHub, composer, npm, nginx, cmake, Wordpress, cPanel</p>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    document.getElementById('app').style.opacity = "1";
  }
}
</script>