import { ref, onMounted } from "vue";
import popupUtil from "../components/base/DynamicModal/popupUtil";
import { formMode } from "../enum/formMode";
import commonFn from "../common/commonFn";
import { confirm } from "../common/dialogFn";
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
        const res = await this.$axios.post(`${this.module}/list`, payload);
        // Lưu vào sau còn dùng
        // Dùng thế nào thì chưa biết
        this.lastPayload = Object.assign({}, payload);
        this.data = res.data.Data;
        this.total = res.data.Sum;
      } catch (error) {
        console.log(error);
      } finally {
        this.tableLoading = false;
      }
    },

    /**
     * Load lại danh sách theo payload cũ
     */
    async reload() {
      // nếu có lastPayload thì gọi theo cái đấy không thì load mới
      if (this.lastPayload) {
        try {
          const res = await this.$axios.post(
            `${this.module}/list`,
            this.lastPayload
          );
          this.data = res.data.Data;
          this.total = res.data.Sum;
        } catch (error) {
          console.log(error);
        }
      } else {
        this.loadData();
      }
    },

    /**
     * Xử lí columns
     * @param {*} payload
     */
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
     * Action click => mặc định đang dùng để xóa
     */
    async onClickAciton(row, action) {
      switch (action) {
        case "View":
          this.edit(row);
          break;
        case "Delete":
          this.deleteAction(row);
          break;
        default:
          console.log("Thiếu config action");
          break;
      }
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

    /**
     * Xóa 1 dòng
     *
     *
     * @param {*} row
     */
    deleteAction(row) {
      var title = "Xóa " + this.headerText;
      const text =
        'Bạn có muốn xóa {0} <span class="strong-text">{1}</span> không?';
      var message = commonFn.replaceTextWithHTML(
        text,
        this.headerText,
        row[this.nameKey]
      );
      confirm(title, message).then((answer) => {
        if (answer) {
          commonFn.mask();
          //xóa & đóng
          var param = [row[this.primaryKey]];
          this.delete(param);
        }
      });
    },

    /**
     * Hành động xóa
     */
    async delete(param) {
      try {
        const res = await this.$axios.delete(`${this.module}`, { data: param });
        if (res.data.length == 0) {
          // Cập nhật lại List bên ngoài
          await this.reload();
          //Hiển thị toast thành công
          commonFn.toastSuccess("Xóa dữ liệu thành công");
        } else {
          // Xử lí lỗi nghiệp vụ
          commonFn.toastError("Xóa dữ liệu không thành công");
        }
      } catch (error) {
        commonFn.toastError("Xóa dữ liệu không thành công");
      } finally {
        commonFn.unMask();
      }
    },
  },
  data() {
    return {
      data: [], // Danh sách lấy về từ api
      total: null, // Tổng số bảng ghi
      tableLoading: false,
      lastPayload: null,
    };
  },
};
