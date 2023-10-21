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
import { ModalsContainer } from 'vue-final-modal';
import { VueFinalModal } from 'vue-final-modal';
import { createVfm } from 'vue-final-modal';

import ThemChuNha from './modal/ThemChuNha.vue';

import 'vue-final-modal/style.css';

const app = createApp(App);
// base component
app.component('MainLayout', MainLayout);
app.component('TheInput', TheInput);
app.component('TheButton', TheButton);
app.component('DynamicModal', DynamicModal);
app.component('GridViewer', GridViewer);
// modal
app.component('ThemChuNha', ThemChuNha);
// lib
app.component('ModalsContainer', ModalsContainer);
app.component('VueFinalModal', VueFinalModal);

const vfm = createVfm();
app.use(router);
app.use(i18n);
app.use(vfm);

app.mount('#app');
