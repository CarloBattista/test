import { createApp } from 'vue'
import './style/style.css'
import App from './App.vue'

import router from './routing/router';
import VueSplide from '@splidejs/vue-splide';

const app = createApp( App );
app.use( router );
app.use( VueSplide );
app.mount( '#app' );
