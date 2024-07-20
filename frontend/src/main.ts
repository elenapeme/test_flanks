import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify' // Ensure this path is correct
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
