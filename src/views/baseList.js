import { ref, onMounted } from "vue";
import axios from "axios";
import popupUtil from "../components/base/DynamicModal/popupUtil";
import commonFn from "../common/commonFn";
import { formMode } from "../enum/formMode";
export default {
  setup() {},
  async beforeMount() {
    // Load dữ liệu
    try {
      this.tableLoading = true;
      const res = await axios.get("ChuNha");
      this.data = res.data;
      this.tableLoading = false;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    /**
     * Mở form detail theo cấu hình formDetailName
     */
    showDetailForm(mode) {
      const me = this;
      const param = {
        mode: mode,
      };
      if (me.formDetailName) {
        popupUtil.show(me.formDetailName, param);
      } else {
        console.log("Chưa cấu hình form detail");
      }
    },

    /**
     * Mở form thêm mới
     */
    add() {
      const me = this;
      commonFn.mask();
      // Mở form detail
      me.showDetailForm(formMode.Add);
      // Load Data
      commonFn.unMask();
    },

    /**
     * Mở form sửa
     */
    edit() {
      const me = this;
      commonFn.mask();
      // Mở form detail
      me.showDetailForm(formMode.Edit);
      // Load Data
      commonFn.unMask();
    },

    /**
     * Sự kiện db click row grid
     * @param {*} row
     */
    onDbClick(row) {
      const me = this;
      me.edit(row);
    },
  },
  data() {
    return {
      data: [], //Danh sách lấy về từ api
      tableLoading: false,
    };
  },
};
