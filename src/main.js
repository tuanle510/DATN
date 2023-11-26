import "./css/main.css";
import { createApp } from "vue";
import App from "./App.vue";
// Layout
import MainLayout from "./components/layout/MainLayout.vue";
// Components
import TheInput from "./components/base/Input/TheInput.vue";
import TheNumber from "./components/base/Input/TheNumber.vue";
import TheButton from "./components/base/Button/TheButton.vue";
import DynamicModal from "./components/base/DynamicModal/DynamicModal.vue";
import GridViewer from "./components/base/GridViewer/GridViewer.vue";
import GridEditor from "./components/base/GridEditor/GridEditor.vue";
import TheCheckbox from "./components/base/Checkbox/TheCheckbox.vue";
import TheLoading from "./components/base/Loading/TheLoading.vue";
import TheComboBox from "./components/base/ComboBox/TheComboBox.vue";
import TheDatepicker from "./components/base/Datepicker/TheDatepicker.vue";
// View
import ChuNhaDetail from "./views/ChuNha/ChuNhaDetail.vue";
import CanHoDetail from "./views/CanHo/CanHoDetail.vue";
// Lib
import { vfmPlugin } from "vue-final-modal";
import { PromiseDialog } from "vue3-promise-dialog";
import router from "./router";
import i18n from "./i18ns/i18n";
import axios from "axios";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

axios.defaults.baseURL = "http://localhost:5002/api/";

const app = createApp(App);
// base component
app.component("MainLayout", MainLayout);
app.component("TheInput", TheInput);
app.component("TheNumber", TheNumber);
app.component("TheButton", TheButton);
app.component("DynamicModal", DynamicModal);
app.component("GridViewer", GridViewer);
app.component("GridEditor", GridEditor);
app.component("TheCheckbox", TheCheckbox);
app.component("TheLoading", TheLoading);
app.component("TheComboBox", TheComboBox);
app.component("TheDatepicker", TheDatepicker);
// modal
app.component("ChuNhaDetail", ChuNhaDetail);
app.component("CanHoDetail", CanHoDetail);
app.use(router);
app.use(i18n);
app.use(vfmPlugin);
app.use(PromiseDialog);
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 10,
  newestOnTop: true,
  timeout: 5000,
  position: "top-center",
  hideProgressBar: true,
  toastClassName: "m-toast",
  showCloseButtonOnHover: false,
  closeButton: false,
  closeOnClick: false,
  transition: "fade",
});

app.mount("#app");
