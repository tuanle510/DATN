import { $vfm } from "vue-final-modal";
class popupUtil {
  show(name, param) {
    const popup = $vfm.show({ component: name }, param);
    console.log(name);
    return popup;
  }

  hide(name) {
    const popup = $vfm.hide(name);
    return popup;
  }

  hideAll() {
    const popup = $vfm.hideAll();
    return popup;
  }
}
export default new popupUtil();
