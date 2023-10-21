import { useModal } from 'vue-final-modal';
// const vfm = createVfm();
class popupUtil {
  // const modalName =
  popup(name) {
    const popup = useModal({
      modalId: name,
    });
    return popup;
  }
}
export default new popupUtil();
