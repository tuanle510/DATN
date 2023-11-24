import { ref, onMounted } from "vue";
import axios from "axios";
import popupUtil from "../components/base/DynamicModal/popupUtil";
import { formMode } from "../enum/formMode";
import commonFn from "../common/commonFn";
export default {
  setup() {},
  async beforeMount() {
    // Load dữ liệu
    try {
      this.tableLoading = true;
      const payload = {
        column: this.columns.map((x) => x.dataField).join(","),
        take: 20,
        skip: 0,
      };
      const res = await axios.post(`${this.module}/list`, payload);
      this.data = res.data;
    } catch (error) {
      console.log(error);
    } finally {
      this.tableLoading = false;
    }
  },
  methods: {
    /**
     * Mở form detail theo cấu hình formDetailName
     */
    showDetailForm(param) {
      // Mở mask để bind xong data vào detal thì mới unmask
      commonFn.mask();
      const me = this;
      if (me.formDetailName) {
        popupUtil.show(me.formDetailName, param);
        console.log(me.formDetailName);
      } else {
        console.log("Chưa cấu hình form detail");
      }
    },

    /**
     * Mở form sửa
     * @param {*} row
     */
    edit(row) {
      const param = {
        mode: formMode.Edit,
        id: row[this.primaryKey],
      };
      this.showDetailForm(param);
    },

    /**
     * Mở form thêm mới
     */
    add() {
      const param = {
        mode: formMode.Add,
      };
      this.showDetailForm(param);
    },
  },
  data() {
    return {
      data: [], // Danh sách lấy về từ api
      tableLoading: false,
    };
  },
};
