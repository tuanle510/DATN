import './css/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './i18ns/i18n';
import MainLayout from './components/layout/MainLayout.vue';
import TheInput from './components/base/TheInput.vue';

const app = createApp(App);
// base component
app.component('MainLayout', MainLayout);
app.component('TheInput', TheInput);

app.use(router);
app.use(i18n);

app.mount('#app');
