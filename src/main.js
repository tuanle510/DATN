import './css/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './i18ns/i18n';
import MainLayout from './components/layout/MainLayout.vue';

import TheInput from './components/base/Input/TheInput.vue';
import TheButton from './components/base/Button/TheButton.vue';
import DynamicModal from './components/base/DynamicModal/DynamicModal.vue';
import GridViewer from './components/base/GridViewer/GridViewer.vue';
import ThemChuNha from './modal/ThemChuNha.vue';
import ThemHopDong from './modal/ThemHopDong.vue';
import { vfmPlugin } from 'vue-final-modal';

const app = createApp(App);
// base component
app.component('MainLayout', MainLayout);
app.component('TheInput', TheInput);
app.component('TheButton', TheButton);
app.component('DynamicModal', DynamicModal);
app.component('GridViewer', GridViewer);

// modal
app.component('ThemChuNha', ThemChuNha);
app.component('ThemHopDong', ThemHopDong);
app.use(router);
app.use(i18n);
app.use(vfmPlugin);

app.mount('#app');
