import "./css/main.css";
import { createApp } from "vue";
import App from "./App.vue";
// Layout
import MainLayout from "./components/layout/MainLayout.vue";
// Components
import TheInput from "./components/base/Input/TheInput.vue";
import TheTextArea from "./components/base/Input/TheTextArea.vue";
import TheNumber from "./components/base/Input/TheNumber.vue";
import TheButton from "./components/base/Button/TheButton.vue";
import DynamicModal from "./components/base/DynamicModal/DynamicModal.vue";
import GridViewer from "./components/base/GridViewer/GridViewer.vue";
import GridEditor from "./components/base/GridEditor/GridEditor.vue";
import TheCheckbox from "./components/base/Checkbox/TheCheckbox.vue";
import TheLoading from "./components/base/Loading/TheLoading.vue";
import TheComboBox from "./components/base/ComboBox/TheComboBox.vue";
import TheDatepicker from "./components/base/Datepicker/TheDatepicker.vue";
import TheMenuWrapper from "./components/base/MenuWrapper/TheMenuWrapper.vue";
import TheMenuItem from "./components/base/MenuWrapper/TheMenuItem.vue";
// View
import OwnerDetail from "./views/Owner/OwnerDetail.vue";
import ApartmentDetail from "./views/Apartment/ApartmentDetail.vue";
import ClientDetail from "./views/Client/ClientDetail.vue";
import ContractDetail from "./views/Contract/ContractDetail.vue";
import ContractGroupDetail from "./views/ContractGroup/ContractGroupDetail.vue";
// Param
import DesiredQuestion from "./views/Contract/DesiredQuestion.vue";
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
app.config.globalProperties.$axios = axios;
// base component
app.component("MainLayout", MainLayout);
app.component("TheInput", TheInput);
app.component("TheTextArea", TheTextArea);
app.component("TheNumber", TheNumber);
app.component("TheButton", TheButton);
app.component("DynamicModal", DynamicModal);
app.component("GridViewer", GridViewer);
app.component("GridEditor", GridEditor);
app.component("TheCheckbox", TheCheckbox);
app.component("TheLoading", TheLoading);
app.component("TheComboBox", TheComboBox);
app.component("TheDatepicker", TheDatepicker);
app.component("TheMenuWrapper", TheMenuWrapper);
app.component("TheMenuItem", TheMenuItem);
// modal
app.component("OwnerDetail", OwnerDetail);
app.component("ApartmentDetail", ApartmentDetail);
app.component("ClientDetail", ClientDetail);
app.component("ContractDetail", ContractDetail);
app.component("ContractGroupDetail", ContractGroupDetail);
// Param
app.component("DesiredQuestion", DesiredQuestion);
app.use(router);
app.use(i18n);
app.use(vfmPlugin);
app.use(PromiseDialog);
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 10,
  newestOnTop: true,
  timeout: 3000,
  position: "top-center",
  hideProgressBar: true,
  toastClassName: "m-toast",
  showCloseButtonOnHover: false,
  closeButton: false,
  closeOnClick: false,
  transition: "fade",
});

app.mount("#app");
