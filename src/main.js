import { createApp } from 'vue'
import App from './App.vue'
//import Resume from './Resume.vue'
import router from './router'
import store from './store'
import './app.css'

createApp(App).use(store).use(router).mount('#app')
//createApp(Resume).use(store).use(router).mount('#app')
