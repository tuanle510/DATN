import { useToast } from "vue-toastification";
import iconSuccess from "../components/icons/IconSuccess.vue";
import iconError from "../components/icons/IconError.vue";
class commonFn {
  findLoading() {
    const el = document.getElementById("mloading");
    return el;
  }
  mask() {
    const el = this.findLoading();
    if (el) {
      el.style.display = "flex";
    }
  }
  unMask() {
    const el = this.findLoading();
    if (el) {
      el.style.display = "none";
    }
  }

  checkDiff(obj1, obj2) {
    const json1 = JSON.stringify(obj1).replace(/:null,/g, ":'',");
    const json2 = JSON.stringify(obj2).replace(/:null,/g, ":'',");

    return json1 !== json2;
  }

  toastSuccess(mess) {
    const toast = useToast();
    let toastMess = mess || "Thao tác thành công";
    toast(toastMess, {
      icon: iconSuccess,
    });
  }

  toastError(mess) {
    const toast = useToast();
    let toastMess = mess || "Thao tác không thành công";
    toast(toastMess, {
      icon: iconError,
    });
  }
}
export default new commonFn();
