import './css/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './i18ns/i18n';
import Header from './components/layout/TheHeader.vue';
import Navbar from './components/layout/TheNavBar.vue';
import MainLayout from './components/layout/MainLayout.vue';

const app = createApp(App);

app.use(router);
app.use(i18n);

// base component
app.component('MISAHeader', Header);
app.component('MainLayout', MainLayout);
app.component('MISANavbar', Navbar);

app.mount('#app');
