import { ref, onMounted } from "vue";
import popupUtil from "@/components/base/DynamicModal/popupUtil";
import commonFn from "@/common/commonFn";
import { confirm, confirmYes } from "@/common/dialogFn";
export default {
  setup() {},
  async beforeMount() {
    // Load dữ liệu
    await this.loadData();
  },

  async mounted() {
    window._list = this;
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
        commonFn.toastError("Đã có lỗi xảy ra");
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
        this.tableLoading = true;
        try {
          const res = await this.$axios.post(
            `${this.module}/list`,
            this.lastPayload
          );
          this.data = res.data.Data;
          this.total = res.data.Sum;
        } catch (error) {
          console.log(error);
        } finally {
          this.tableLoading = false;
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
      this.onClickAcitonCustom(row, action);
      switch (action) {
        case "Edit":
          this.edit(row);
          break;
        case "View":
          this.view(row);
          break;
        case "Delete":
          this.delete(row);
          break;
        default:
          console.log("Thiếu config action");
          break;
      }
    },

    onClickAcitonCustom(row, action) {},

    /**
     * Mở form detail theo cấu hình formDetailName
     */
    showDetailForm(param) {
      // Mở mask để bind xong data vào detal thì mới unmask
      commonFn.mask();
      const me = this;
      // Truyền hàm reload vào cho detial load lại trước khi đóng
      param.submit = me.reload;
      if (me.formDetailName) {
        popupUtil.show(me.formDetailName, param);
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
        mode: this.$constants.formMode.Edit,
        id: row[this.primaryKey],
      };
      this.showDetailForm(param);
    },

    /**
     * Mở form view (chỉ xem)
     * @param {*} row
     */
    view(row) {
      const param = {
        mode: this.$constants.formMode.View,
        id: row[this.primaryKey],
      };
      this.showDetailForm(param);
    },

    /**
     * Mở form thêm mới
     */
    add() {
      const param = {
        mode: this.$constants.formMode.Add,
      };
      this.showDetailForm(param);
    },

    /**
     * Xóa 1 dòng
     *
     *
     * @param {*} row
     */
    delete(row) {
      var title = "Xóa " + this.headerText;
      const text =
        'Bạn có muốn xóa {0} <span class="strong-text">{1}</span> không?';
      var message = commonFn.replaceTextWithHTML(
        text,
        this.headerText,
        row[this.nameKey]
      );
      confirm(title, message).then(async (answer) => {
        if (answer) {
          commonFn.mask();
          //xóa & đóng
          var param = [row[this.primaryKey]];
          await this.deleteAction(param);
        }
      });
    },

    /**
     * Hành động xóa
     */
    async deleteAction(param) {
      try {
        const res = await this.$axios.delete(`${this.module}`, { data: param });
        if (res.data.length == 0) {
          // Cập nhật lại List bên ngoài
          await this.reload();
          //Hiển thị toast thành công
          commonFn.toastSuccess("Xóa dữ liệu thành công");
        } else {
          this.handleValidateError(res.data);
        }
        // Gán lại danh sách đã chọn
        this.selected = [];
      } catch (error) {
        commonFn.toastError("Xóa dữ liệu không thành công");
      } finally {
        commonFn.unMask();
      }
    },

    // Xử lí lỗi
    async handleValidateError(res) {
      // có bản ghi xóa được
      if (res.length < this.selected.length) {
        // Cập nhật lại List bên ngoài
        await this.reload();
        commonFn.toastSuccess("Xóa dữ liệu thành công");
      } else {
        commonFn.toastError("Xóa dữ liệu không thành công");
      }
      var length = res.length < 10 ? "0" + res.length : res.length;
      const text =
        '<span class="strong-text">{0} </span> bản ghi được chọn không thể xóa vì đã phát sinh hợp đồng. Vui lòng kiểm tra lại trước khi thực hiện xóa';
      var message = commonFn.replaceTextWithHTML(text, length);
      confirmYes("Không hợp lệ", message).then((answer) => {
        if (answer) {
          // chả làm gì
        }
      });
    },

    /**
     * Hành động xóa nhiều
     */
    async deleteMulti() {
      if (this.selected && this.selected.length == 0) {
        const text =
          'Vui lòng chọn <span class="strong-text"> ít nhất 1 bản ghi </span> để thực hiện được chức năng này.';
        var message = commonFn.replaceTextWithHTML(text);
        confirmYes("Không hợp lệ", message).then((answer) => {
          if (answer) {
            // chả làm gì
          }
        });
      } else {
        var title = "Xóa " + this.headerText;
        const text =
          '<span class="strong-text">{0} </span> bản ghi đã được chọn. Bạn có chắc muốn xóa các bản ghi {1} này khỏi danh sách không?';
        var length =
          this.selected.length < 10
            ? "0" + this.selected.length
            : this.selected.length;
        var message = commonFn.replaceTextWithHTML(
          text,
          length,
          this.headerText
        );
        confirm(title, message).then(async (answer) => {
          if (answer) {
            commonFn.mask();
            //xóa & đóng
            var param = this.selected.map((x) => x[this.primaryKey]);
            await this.deleteAction(param);
          }
        });
      }
    },
  },
  data() {
    return {
      data: [], // Danh sách lấy về từ api
      total: null, // Tổng số bảng ghi
      tableLoading: false,
      lastPayload: null,
      selected: [],
    };
  },
};
