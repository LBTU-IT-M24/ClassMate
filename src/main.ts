import './assets/main.css';
import 'v-calendar/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import '@vuepic/vue-datepicker/dist/main.css';

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

import { createPinia } from 'pinia';
app.use(createPinia());

import VCalendar from 'v-calendar';
app.use(VCalendar, {});

import { createBootstrap } from 'bootstrap-vue-next';
app.use(createBootstrap());

import VueDatePicker from '@vuepic/vue-datepicker';
app.component('VueDatePicker', VueDatePicker);

// PrimeVue
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Editor from 'primevue/editor';
import Slider from 'primevue/slider';
import ColorPicker from 'primevue/colorpicker';

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '',
        },
    },
});

app.component('Editor', Editor);
app.component('Slider', Slider);
app.component('ColorPicker', ColorPicker);

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
