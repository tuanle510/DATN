import { ref, onMounted } from "vue";
import popupUtil from "../components/base/DynamicModal/popupUtil";
import commonFn from "../common/commonFn";
export default {
  setup() {},
  methods: {
    add() {
      commonFn.mask();
      const me = this;
      if (me.formDetailName) {
        popupUtil.show(me.formDetailName);
      } else {
        console.log("Chưa cấu hình form detail");
      }
      setTimeout(() => {
        commonFn.unMask();
      }, 1000);
    },
  },
};
