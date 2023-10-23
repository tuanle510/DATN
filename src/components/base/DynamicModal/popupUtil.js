import { $vfm } from 'vue-final-modal';
// const vfm = createVfm();
class popupUtil {
  // const modalName =
  show(name, param) {
    const popup = $vfm.show({ component: name }, param);
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
