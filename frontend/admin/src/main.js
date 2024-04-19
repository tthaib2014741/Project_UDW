import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import './assets/main.css'
import store from './store/index.js';
import { createApp } from 'vue'
import App from './App.vue'


 
import router from "./router";


createApp(App).use(router).use(store).mount('#app');
