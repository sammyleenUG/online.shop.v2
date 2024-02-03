import 'animate.css';
import store from './store/store.js';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import "./registerServiceWorker";

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App)
    .use(router)
    .use(store)
    .use(Toast, {
        transition: "Vue-Toastification__bounce",
        maxToasts: 20,
        newestOnTop: true,
        position: 'bottom-left',
    })
    .mount('#app');
