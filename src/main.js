import { createApp } from 'vue';
import App from './App.vue';
import './style.css'
import router from './router'; // impor router

const app = createApp(App);

app.use(router); // pasang router ke aplikasi
app.mount('#app');