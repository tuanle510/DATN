import { ref, onMounted } from "vue";
import axios from "axios";
import popupUtil from "../components/base/DynamicModal/popupUtil";
import { formMode } from "../enum/formMode";
import commonFn from "../common/commonFn";
export default {
  setup() {},
  async beforeMount() {
    // Load dữ liệu
    await this.loadData();
  },
  methods: {
    /**
     * Load data
     * @param {*} payload
     */
    async loadData(payload) {
      try {
        this.tableLoading = true;
        if (!payload) {
          var payload = {
            take: 20,
            skip: 0,
          };
        }
        this.processColumns(payload);
        console.log(payload);
        const res = await axios.post(`${this.module}/list`, payload);
        this.data = res.data.Data;
        this.total = res.data.Sum;
      } catch (error) {
        console.log(error);
      } finally {
        this.tableLoading = false;
      }
    },

    processColumns(payload) {
      // Các cột config trong bảng
      var columns = this.columns.map((x) => x.dataField);
      if (this.primaryKey && !columns.includes(this.primaryKey)) {
        columns.push(this.primaryKey);
      }
      payload.columns = columns.join(",");
    },

    /**
     * Sự kiện phân trang
     * @param {*} payload
     */
    async onPaginate(payload) {
      await this.loadData(payload);
    },
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
      total: null, // Tổng số bảng ghi
      tableLoading: false,
    };
  },
};
