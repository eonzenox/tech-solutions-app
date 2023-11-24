import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

// Load custom fonts
loadFonts()

// Create the app with Vuetify and set the dark theme
createApp(App)
  .use(vuetify)
  .mount('#app');