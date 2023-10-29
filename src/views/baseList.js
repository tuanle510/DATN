import { ref, onMounted } from 'vue';
import popupUtil from '../components/base/DynamicModal/popupUtil';
import commonFn from '../common/commonFn';
export default {
  setup() {},
  methods: {
    /**
     * Mở form detail theo cấu hình formDetailName
     */
    showDetailForm() {
      const me = this;
      if (me.formDetailName) {
        popupUtil.show(me.formDetailName);
      } else {
        console.log('Chưa cấu hình form detail');
      }
    },

    /**
     * Mở form thêm mới
     */
    add() {
      const me = this;
      commonFn.mask();
      // Mở form detail
      me.showDetailForm();
      // Load Data
      setTimeout(() => {
        commonFn.unMask();
      }, 1000);
    },

    /**
     * Mở form sửa
     */
    edit() {
      const me = this;
      commonFn.mask();
      // Mở form detail
      me.showDetailForm();
      // Load Data
      setTimeout(() => {
        commonFn.unMask();
      }, 1000);
    },

    /**
     * Sự kiện db click row grid
     * @param {*} row
     */
    onDbClick(row) {
      const me = this;
      me.edit();
    },
  },
};
