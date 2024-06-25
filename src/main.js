import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { Quasar } from 'quasar';
import 'quasar/dist/quasar.css';
import './main.css'; // This is where the issue is reported

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Quasar);

app.mount('#app');
