import './assets/main.css';
import 'vue3-analog-clock/dist/style.css';
import 'v-calendar/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import AnalogClock from 'vue3-analog-clock';
import VCalendar from 'v-calendar';
import { createBootstrap } from 'bootstrap-vue-next';

const app = createApp(App);

app.use(createPinia());
app.use(AnalogClock);
app.use(VCalendar, {});
app.use(createBootstrap());

app.mount('#app');
