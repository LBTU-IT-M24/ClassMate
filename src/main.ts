import './assets/main.css';
import 'v-calendar/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import '@vuepic/vue-datepicker/dist/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import VCalendar from 'v-calendar';
import { createBootstrap } from 'bootstrap-vue-next';
import VueDatePicker from '@vuepic/vue-datepicker';

const app = createApp(App);

app.use(createPinia());
app.use(VCalendar, {});
app.use(createBootstrap());
app.component('VueDatePicker', VueDatePicker);

app.mount('#app');
