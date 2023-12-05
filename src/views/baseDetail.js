import { $vfm } from "vue-final-modal";
import { formMode } from "../enum/formMode";
import axios from "axios";
import commonFn from "../common/commonFn";
import { confirm } from "../common/dialogFn";

export default {
  async mounted() {
    const me = this;
    // Gọi dữ liệu
    await me.getData(me._formParam);
    // Gán thêm dữ liệu trc khi binddata nếu cần
    this.beforeBinđData(this.data);
    this.binđData(this.data);
    // Xóa mask
    commonFn.unMask();
  },
  methods: {
    /**
     * Sự kiện mở form
     * @param {*} e
     * @param {*} close
     */
    beforeOpen(e, close) {
      const me = this;
      me._popup = $vfm.dynamicModals[$vfm.dynamicModals.length - 1];
      me._formParam = e.ref.params._rawValue;
    },

    /**
     * Sự kiện trước khi đóng form
     */
    async beforeClose(e) {
      const me = this;
      if (!me._suddenClose) {
        const isDiff = commonFn.checkDiff(me.model, me.oldData);
        if (isDiff) {
          e.stop();
          // show thông báo
          this.showQuestionChage();
          return;
        }
      }
    },

    /**
     * Hỏi khi đã thay đổi dữ liệu
     */
    showQuestionChage() {
      const me = this;
      confirm("Dữ liệu đã thay đổi", "Bạn có muốn Cất không?").then(
        (answer) => {
          switch (answer) {
            case true:
              //cất & đóng
              me.saveAction();
              break;
            case false:
              //đóng không cất
              this.hide();
              break;
          }
        }
      );
    },

    /**
     * Show form dựa theo mode truyền vào
     * @param {*} param
     */
    async getData(param) {
      const me = this;
      // Case theo mode
      const editMode = param.mode;
      switch (editMode) {
        case formMode.Add:
          await me.add();
          break;
        case formMode.Edit:
          await me.edit(param);
          break;
        default:
          break;
      }
    },

    /**
     * Gọi dữ liệu mới theo entity
     */
    async add() {
      //Load data mới
      try {
        var res = await axios.get(`${this.module}/new`);
        this.data = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Gọi dữ liệu theo id
     */
    async edit(param) {
      // Load Data
      try {
        const res = await axios.get(`${this.module}/${param.id}`);
        this.data = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Gán thêm dữ liệu trc khi binddata nếu cần
     * @param {*} data
     */
    beforeBinđData(data) {},

    /**
     * Gán dữ liệu vào model
     * @param {*} data
     */
    binđData(data) {
      this.model = data;
      this.oldData = Object.assign({}, this.model);
    },
    /**
     * Đóng form
     */
    hide() {
      const me = this;
      me._popup.value = false;
      me._suddenClose = true;
    },

    /**
     * Lấy các control nhập liệu
     */
    addObserveControl() {
      const $el = this.$el;
      if (!this._observeControls) {
        this._observeControls = [];
        const $controls = $el.querySelectorAll(".m-validate");
        if ($controls && $controls.length > 0) {
          $controls.forEach((item) => {
            if (typeof item.getVueInstance === "function") {
              this._observeControls.push(item.getVueInstance());
            }
          });
        }
      }
    },

    /**
     * Sự kiện mở form
     */
    opened() {
      const $el = this.$el;
      this.$nextTick(() => {
        this.addObserveControl();
        // focus vào ô đầu tiên
        const firstInput = $el.querySelector("input");
        if (firstInput) {
          firstInput.focus();
        }
      });
    },

    /**
     * Xử lí trc khi save
     * @returns
     */
    validateBeforeSave() {
      const me = this;
      // validate control
      if (!me.validateComponents()) {
        me.$nextTick(() => {
          me.focusFirstError();
        });
        return false;
      }
      return true;
    },

    /**
     * Hàm validate các control input
     */
    validateComponents() {
      const me = this;
      if (me._observeControls && me._observeControls.length > 0) {
        let controls = me._observeControls.filter(
          (x) =>
            x.$el.offsetWidth ||
            x.$el.offsetHeight ||
            x.$el.getClientRects().length ||
            /** Xử lý validate control khi ẩn */
            (Array.isArray(x?.rules) && x.rules?.some((x) => x.hide))
        );
        if (controls.length > 0) {
          const errors = controls.map((x) => {
            if (typeof x.validate === "function") {
              return x.validate();
            }
            return "";
          });
          return !errors.some((x) => x);
        }
      }
      return true;
    },

    /**
     * Focus vào input lỗi đầu tiên
     */
    focusFirstError() {
      const $el = this.$el;
      const firstErrorEl = $el.querySelector(".m-input.m-input-error");
      if (firstErrorEl) {
        firstErrorEl.focus();
      }
    },

    /**
     * Hành động ấn vào nút Cất
     * @returns
     */
    async saveAction() {
      commonFn.mask();
      if (!this.validateBeforeSave()) {
        commonFn.unMask();
        return;
      }
      await this.save();
      commonFn.unMask();
    },

    /**
     * Gửi API lên để thêm mới
     */
    async save() {
      try {
        const res = await axios.post(`${this.module}`, this.model);
        if (res.statusText == "Created") {
          //Hiển thị toast thành công
          this.hide();
          commonFn.toastSuccess();
          // Cập nhật lại List bên ngoài
        }
      } catch (error) {
        console.log(error);
      } finally {
        commonFn.unMask();
      }
    },
  },
  data() {
    return {
      data: {}, //Chi tiết gọi từ API
      model: {},
      oldData: {}, // Dữ liệu ban đầu khi bind vào form
    };
  },
};
