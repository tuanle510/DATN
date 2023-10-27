import "./css/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18ns/i18n";
import MainLayout from "./components/layout/MainLayout.vue";

import TheInput from "./components/base/Input/TheInput.vue";
import TheButton from "./components/base/Button/TheButton.vue";
import DynamicModal from "./components/base/DynamicModal/DynamicModal.vue";
import GridViewer from "./components/base/GridViewer/GridViewer.vue";
import TheCheckbox from "./components/base/Checkbox/TheCheckbox.vue";
import TheLoading from "./components/base/Loading/TheLoading.vue";

import ThemChuNha from "./views/ChuNha/ThemChuNha.vue";
import { vfmPlugin } from "vue-final-modal";

const app = createApp(App);
// base component
app.component("MainLayout", MainLayout);
app.component("TheInput", TheInput);
app.component("TheButton", TheButton);
app.component("DynamicModal", DynamicModal);
app.component("GridViewer", GridViewer);
app.component("TheCheckbox", TheCheckbox);
app.component("TheLoading", TheLoading);

// modal
app.component("ThemChuNha", ThemChuNha);
app.use(router);
app.use(i18n);
app.use(vfmPlugin);

app.mount("#app");
