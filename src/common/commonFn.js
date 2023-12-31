import { useToast } from "vue-toastification";
import iconSuccess from "@/components/icons/IconSuccess.vue";
import iconError from "@/components/icons/IconError.vue";
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

  /**
   * Hàm gán text và các biến
   * @param {*} text
   * @param  {...any} array
   * @returns
   */
  replaceTextWithHTML(text, ...array) {
    // Thực hiện replace cho mỗi vị trí {0}, {1}, ...
    let replacedText = text;
    for (let i = 0; i < array.length; i++) {
      const html = this.sanitizeHTML(array[i]);
      const placeholderRegex = new RegExp(`\\{${i}\\}`, "g");
      replacedText = replacedText.replace(placeholderRegex, html);
    }

    return replacedText;
  }

  /**
   * Hàm để xử lý và loại bỏ các ký tự đặc biệt từ chuỗi HTML
   * @param {*} input
   * @returns
   */
  sanitizeHTML(input) {
    let value = "";
    if (input) {
      value = String(input)
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }
    return value;
  }

  genGuid() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  /**
   * Hàm format tiền
   * @param {*} value
   */
  formatCurrency(value) {
    if (value && !isNaN(value)) {
      return parseFloat(value)
        .toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
          currencyDisplay: "narrowSymbol",
        })
        .replace("₫", "")
        .trim();
    }
  }

  formatDate(value) {
    // Tạo một đối tượng Date mới
    let currentDate = new Date(value);

    // Đặt thời gian thành 00:00:00.000
    currentDate.setHours(0, 0, 0, 0);

    // Chuyển đổi thành chuỗi ISO 8601
    return currentDate.toISOString();
  }
}
export default new commonFn();
