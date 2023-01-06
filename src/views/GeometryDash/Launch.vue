<template>
  <layout-standard title="Launch Profiles">
    <modal-box v-if="formModal" @click.self="formModal = false">
      <!-- Page 1 -->
      <div v-if="formPage === 0" class="y space-y-2">
        <h1 v-if="!formKey" class="font-bold text-2xl">Create New Profile</h1>
        <h1 v-else class="font-bold text-2xl">Edit Profile "{{ formProfile.name }}"</h1>
        <div class="x gap-2">
          <text-input v-model="formProfile.name" placeholder="Profile Name"/>
          <text-input v-if="formSave === 'new'" v-model="formSaveName" placeholder="Save Name"/>
        </div>
        <span @click="formAdvanced = true" v-if="!formAdvanced" class="self-end cursor-pointer text-blue-500">&#709;&nbsp;Advanced Save Options</span>
        <template v-else>
          <span @click="formAdvanced = false" class="self-end cursor-pointer text-blue-500">&#708;&nbsp;Advanced Save Options</span>
          <text-input placeholder="http://boomlings.com/database/"/>
          <div class="x gap-2">
            <select-list class="grow w-1/2">
              <option value="new" selected>+ Add New Executable</option>
            </select-list>
            <label class="cursor-pointer grow w-1/2 mt-1">
              <round-box ref="binlabel">Input Custom EXE</round-box>
              <input @input="e => this.$refs.binlabel.$el.innerText = e.target.value.split(/([\\\/])/g).pop()" type="file" class="hidden">
            </label>
          </div>
        </template>
        <div class="x gap-2">
          <label class="y w-1/2">Mod Loader
            <select-list v-model="formProfile.loader">
              <option value="steam">None (Vanilla Steam)</option>
              <option value="geode">Geode</option>
              <option value="modldr">ModLdr</option>
              <option value="hm">GD Hackermode</option>
              <option value="mh">MegaHack</option>
            </select-list>
          </label>
          <label class="y w-1/2">Save File
            <select-list v-model="formSave">
              <option value="new">+ Create New Save</option>
              <option v-for="(save, key) in saves" :key="key" :value="key" :selected="key === formSave">
                {{ save.name }}
              </option>
            </select-list>
          </label>
        </div>
        <div class="x justify-between">
          <span>Inactive Mods</span>
          <span>Active Mods</span>
        </div>
        <div class="x gap-2 justify-between">
          <multi-select id="inactiveMods" class="grow basis-0">
            <option v-for="(mod, key) in formModsInactive" :key="key" :data-key="key"
                    :value="typeof(mod.path) === 'undefined' ? key : mod.path">
              <template v-if="typeof(mod.path) !== 'undefined'">*</template>
              {{ mod.name }}
            </option>
          </multi-select>
          <div class="y space-y-2">
            <button-round-small @click="addMods">Add&nbsp;&gt;</button-round-small>
            <button-round-small @click="removeMods">&lt;&nbsp;Remove</button-round-small>
            <button-round-small @click="refreshMods">Refresh</button-round-small>
            <button-round-small @click="openUserModsFolder">Usermods&nbsp;Folder</button-round-small>
          </div>
          <multi-select id="activeMods" class="grow basis-0">
            <option v-for="(mod, key) in formModsActive" :key="key" :data-key="key"
                    :value="typeof(mod.path) === 'undefined' ? key : mod.path">
              <template v-if="typeof(mod.path) !== 'undefined'">*</template>
              {{ mod.name }}
            </option>
          </multi-select>
        </div>
        <span>*unverified user DLLs might be unsafe. Make sure you only load trusted mods!</span>
        <div class="x gap-2">
          <button-round @click="formModal = false;" class="grow">Cancel</button-round>
          <button-round v-if="!formKey" @click="createProfile" class="grow">Create</button-round>
          <template v-else>
            <button-round @click="saveProfile" class="grow">Save</button-round>
            <button-round @click="deleteProfile" class="grow">Delete</button-round>
          </template>
        </div>
      </div>
      <!-- Page 2 -->
      <div v-if="formPage === 1" class="y space-y-2">
        <h1 class="font-bold text-2xl">Create New Profile</h1>
        <div class="x gap-2">
          <label class="y grow basis-0">Mod Loader
            <select-list class="w-full" v-model="formProfile.loader">
              <option value="steam">None (Vanilla Steam)</option>
              <option value="modldr">ModLdr</option>
              <option value="geode" disabled>Geode</option>
              <option value="hackermode" disabled>GD HackerMode (Coming Soon)</option>
              <option value="megahack" disabled>MegaHack (Coming Soon)</option>
            </select-list>
          </label>
          <label class="y grow basis-0">Mod Loader Version
            <select-list class="w-full" v-model="formProfile.loader">
              <option>v0.0.5-alpha</option>
              <option>v0.0.5-alpha</option>
              <option>v0.0.5-alpha</option>
            </select-list>
          </label>
        </div>
      </div>
    </modal-box>
    <template #alt-header>
      <div class="space-x-2">
        <button-round @click="loadProfiles">Refresh</button-round>
        <button-round @click="openModal()">New Profile</button-round>
      </div>
    </template>
    <div class="y space-y-4">
      <round-box v-for="(profile, key) in profiles" :key="key" class="x justify-between items-center">
        <div class="x items-center">
          <div class="y items-center mr-4">
            <img class="w-12" src="@/assets/profileicons/gd_logo.png" alt="Profile Icon"/>
            <pill-label class="font-bold -mt-3">{{ profile.gameVersion }}</pill-label>
          </div>
          <div class="y space-y-2">
            <h2 class="font-bold text-2xl">{{ profile.name }}</h2>
            <div class="x space-x-2">
              <pill-label>Save: {{ saves[profile.save].name ?? 'NaN' }}</pill-label>
              <pill-label>Loader: {{ profile.loader }} {{ profile.loaderVersion }}</pill-label>
              <pill-label>Mods: {{ profile.mods.length }}</pill-label>
            </div>
          </div>
        </div>
        <div class="x space-x-2">
          <button-round @click="launch(profile)">Launch</button-round>
          <button-round @click="openModal(key)">Edit</button-round>
        </div>
      </round-box>
    </div>
  </layout-standard>
</template>
<script>
import LayoutStandard from "@/components/LayoutStandard";
import {readDir, readTextFile, writeFile} from "@tauri-apps/api/fs";
import ButtonRoundSmall from "@/components/ButtonRoundSmall";
import {v4 as uuidv4} from 'uuid';
import ButtonRound from "@/components/ButtonRound";
import PillLabel from "@/components/PillLabel";
import RoundBox from "@/components/RoundBox";
import TextInput from "@/components/TextInput";
import MultiSelect from "@/components/MultiSelect";
import SelectList from "@/components/SelectList";
import ModalBox from "@/components/ModalBox";
import {Command} from "@tauri-apps/api/shell";
import {appDir} from "@tauri-apps/api/path";
import {confirm} from "@tauri-apps/api/dialog";

export default {
  components: {
    ModalBox,
    SelectList,
    MultiSelect,
    TextInput,
    RoundBox,
    PillLabel,
    ButtonRound,
    ButtonRoundSmall,
    LayoutStandard
  },
  data() {
    return {
      profiles: {},
      saves: {},
      mods: {},
      userMods: {},
      formModal: false,
      formPage: 0,
      formProfile: {},
      formModsInactive: {},
      formModsActive: {},
      formSave: null,
      formSaveName: null,
      formKey: null,
      formAdvanced: false
    }
  },
  methods: {
    loadSaves() {
      readTextFile("gd/saves.json", {dir: 18})
          .then(data => this.saves = JSON.parse(data))
    },
    loadMods() {
      readTextFile("gd/mods.json", {dir: 18})
          .then(data => this.mods = JSON.parse(data))
      readDir("gd\\usermods", {dir: 18})
          .then(data => this.userMods = data);
    },
    loadProfiles() {
      readTextFile("gd/profiles.json", {dir: 18})
          .then(data => this.profiles = JSON.parse(data))
    },
    refreshMods() {
      alert("This is currently not implemented yet.\nYou will have to leave this page and come back.\nSorry :/");
    },
    async openUserModsFolder() {
      window.__TAURI__.shell.open(await appDir() + 'gd\\usermods');
    },
    addMods() {
      for (let option of document.getElementById('inactiveMods').options) {
        if (option.selected) {
          this.formModsActive[option.dataset.key] = this.formModsInactive[option.dataset.key]
          delete this.formModsInactive[option.dataset.key];
        }
      }
    },
    removeMods() {
      for (let option of document.getElementById('activeMods').options) {
        if (option.selected) {
          this.formModsInactive[option.dataset.key] = this.formModsActive[option.dataset.key]
          delete this.formModsActive[option.dataset.key];
        }
      }
    },
    openModal(profile = false) {
      this.formPage = 0;
      this.formModsInactive = {
        ...this.userMods,
        ...this.mods
      };
      this.formModsActive = {};
      this.formAdvanced = false;
      if (!profile) {
        this.formKey = null;
        this.formProfile = {
          "name": null,
          "icon": "gd",
          "loader": "steam",
          "loaderVersion": null,
          "gameVersion": "2.11",
          "mods": [],
          "save": null,
          "lastUsed": new Date().toISOString(),
          "created": new Date().toISOString()
        }
        this.formSave = 'new';
        this.formSaveName = '';
      } else {
        this.formKey = profile;
        this.formProfile = this.profiles[profile];
        this.formSave = this.formProfile.save;
        this.formSaveName = this.saves[this.formProfile.save].name;

        // DON'T MIX KEYS FOR USER MODS!!!
        for (let key in this.formProfile.mods) {
          if (typeof (this.formProfile.mods[key].path) === 'undefined') {
            this.formModsActive[this.formProfile.mods[key]] = this.formModsInactive[this.formProfile.mods[key]];
            delete this.formModsInactive[this.formProfile.mods[key]];
          } else {
            for (let jey in this.formModsInactive) {
              if (this.formProfile.mods[key].name === this.formModsInactive[jey].name) {
                this.formModsActive[jey] = this.formProfile.mods[key];
                delete this.formModsInactive[jey];
              }
            }
          }
        }
      }
      this.formModal = true;
    },
    createProfile() {
      for (let key in this.formModsActive) {
        if (typeof (this.formModsActive[key].path) === 'undefined') {
          this.formProfile.mods.push(key);
        } else {
          this.formProfile.mods.push(this.formModsActive[key]);
        }
      }
      if (this.formSave === 'new') {
        this.formProfile.save = this.createSave(this.formSaveName);
      } else {
        this.formProfile.save = this.formSave;
      }
      let uuid = uuidv4();
      this.profiles[uuid] = this.formProfile;
      writeFile({path: "gd/profiles.json", contents: JSON.stringify(this.profiles, null, 2)}, {dir: 18})
      this.formModal = false;
    },
    saveProfile() {
      this.formProfile.mods = [];
      for (let key in this.formModsActive) {
        if (typeof (this.formModsActive[key].path) === 'undefined') {
          this.formProfile.mods.push(key);
        } else {
          this.formProfile.mods.push(this.formModsActive[key]);
        }
      }
      if (this.formSave === 'new') {
        this.formProfile.save = this.createSave(this.formSaveName);
      } else {
        this.formProfile.save = this.formSave;
      }

      this.profiles[this.formKey] = this.formProfile;
      writeFile({path: "gd/profiles.json", contents: JSON.stringify(this.profiles, null, 2)}, {dir: 18});
      this.formModal = false;
    },
    async deleteProfile() {
      let choice = await confirm("Are you sure you would like to delete this mod profile?\n"
          + "The associated save file  will not be deleted.");
      console.log(choice)
      if (!choice) {
        return;
      }
      delete this.profiles[this.formKey];
      await writeFile({path: "gd/profiles.json", contents: JSON.stringify(this.profiles, null, 2)}, {dir: 18});
      this.formModal = false;
    },
    createSave(name, server = null, binary = null) {
      let uuid = uuidv4();
      this.saves[uuid] = {
        "name": name,
        "server": server,
        "binary": binary,
        "lastUsed": new Date().toISOString(),
        "created": new Date().toISOString()
      };
      writeFile({path: "gd/saves.json", contents: JSON.stringify(this.saves, null, 2)}, {dir: 18});
      return uuid;
    },
    async launch(profile) {
      let mods = [];
      for (let key in profile.mods) {
        mods.push('-l');
        if (typeof (profile.mods[key]) === 'string') {
          mods.push(await appDir() + "gd\\mods\\" + this.mods[profile.mods[key]].file);
        } else {
          mods.push(profile.mods[key].path);
        }
      }
      let userdata = [];
      if(profile.save !== "default") {
        userdata = ['-e', 'USERDATA=' + await appDir() + "gd\\saves\\" + profile.save];
      }
      let cmd = Command.sidecar('blackjack-1.2.1', [
        'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Geometry Dash\\GeometryDash.exe',
        ...userdata,
        '-l', 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Geometry Dash\\ModLdr.dll', ...mods]);
      await cmd.execute();
    }
  },
  beforeMount() {
    this.loadSaves();
    this.loadMods();
    this.loadProfiles();
  }
}
</script>