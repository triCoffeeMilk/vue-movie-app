import { createApp } from 'vue'
import App from './App'
import loadImage from './plugins/loadImage'
import router from './routes'
import store from './store'

createApp(App)
  .use(router)  // $route, $router
  .use(store)   // $store
  .use(loadImage) // $loadImage
  .mount('#app')
  