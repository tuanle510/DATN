import { $vfm } from "vue-final-modal";
import commonFn from "@/common/commonFn";
import { confirm } from "@/common/dialogFn";
import dayjs from "dayjs";

export default {
  async mounted() {
    const me = this;
    // Gọi dữ liệu
    await me.getData(me._formParam);
    // Gán form mode cho dễ dùng
    this.mode = me._formParam.mode;
    // Gán thêm dữ liệu trc khi binddata nếu cần
    this.beforeBindData(this.data);
    this.bindData(this.data, this.dataDetail);
    if (me._popup.component != "DesiredQuestion") {
      window._listDetail = this;
    }
    // Xóa mask
    commonFn.unMask();
  },

  watch: {
    mode(newValue) {
      this.isView = newValue == this.$constants.formMode.View;
    },
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
      me.customBeforeClose();
    },

    customBeforeClose() {},

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
        case me.$constants.formMode.Add:
          await me.add();
          break;
        case me.$constants.formMode.Edit:
        case me.$constants.formMode.View:
          await me.view(param);
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
        var res = await this.$axios.get(`${this.module}/new`);
        this.data = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Gọi dữ liệu theo id
     */
    async view(param) {
      // Load Data
      try {
        const res = await this.$axios.get(`${this.module}/${param.id}`);
        this.data = res.data.master;
        this.customView(res.data);
        if (this.isDetailMaster) {
          this.dataDetail = res.data.details || [];
          // Phàn dịch vụ
          this.serviceList = res.data.service || [];
          this.serviceDetail = res.data.detailsService || [];
        }
      } catch (error) {
        commonFn.handleError(error, this.$router);
      }
    },

    // Gán thêm gì thì gán
    customView(data) {},
    /**
     * Gán thêm dữ liệu trc khi binddata nếu cần
     * @param {*} data
     */
    beforeBindData(data) {},

    /**
     * Gán dữ liệu vào model
     * @param {*} data
     */
    bindData(data, dataDetail) {
      this.model = data;
      this.modelDetail = dataDetail;
      // Gán vào 1 object khác dể dùng sau
      this.oldData = Object.assign({}, this.model);
      this.oldDataDetail = [...dataDetail];
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
        const firstInput = $el.querySelector(
          "input:not([disabled]), textarea:not([disabled])"
        );
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
      this.beforeSave();
      commonFn.mask();
      if (!this.validateBeforeSave()) {
        commonFn.unMask();
        return;
      }
      switch (this.mode) {
        case this.$constants.formMode.Add:
          await this.save();
          break;
        case this.$constants.formMode.Edit:
          await this.edit();
          break;
      }
      this.afterSave();
      // Nếu thành công và có config đóng form thì sẽ đóng form
      commonFn.unMask();
    },

    // Để đấy màn nào cần làm gì thì làm
    afterSave() {},

    beforeSave() {},

    /**
     * Gửi API lên để thêm mới
     */
    async save() {
      try {
        // Chuẩn hóa param
        commonFn.standardizedParam(this.model);
        const res = await this.$axios.post(`${this.module}`, this.model);
        if (res.statusText == "Created") {
          commonFn.toastSuccess("Cất pthành công");
          // Cập nhật lại List bên ngoài
          this.afterSaveSuccess();
        }
      } catch (error) {
        commonFn.handleError(error, this.$router);
      }
    },

    /**
     * Gửi API lên để thêm mới
     */
    async edit() {
      try {
        // Chuẩn hóa param
        commonFn.standardizedParam(this.model);
        const res = await this.$axios.put(`${this.module}`, this.model);
        if (res.statusText == "OK") {
          commonFn.toastSuccess("Sửa thành công");
          // Cập nhật lại List bên ngoài
          this.afterSaveSuccess();
        }
      } catch (error) {
        commonFn.handleError(error, this.$router);
      }
    },

    /**
     * Thực hiện sau khi save thành công
     */
    afterSaveSuccess() {
      // load lại danh sách
      if (
        this._formParam &&
        this._formParam.submit &&
        typeof this._formParam.submit === "function"
      ) {
        this._formParam.submit(this.model);
      }
      // List form cất xong thì không đóng mà  chuyển sang mode sửa
      var listNotHide = [
        "ContractGroupDetail",
        "ContractDetail",
        "ContractDetailCtyChu",
        "ContractDetailCtyKhach",
      ];
      if (listNotHide.includes(this._popup.component)) {
        this.mode = this.$constants.formMode.View;
      } else {
        this.hide();
      }
      this.customAfterSaveSuccess();
    },

    customAfterSaveSuccess() {},

    /**
     * Chuyển sang mode Sửa
     */
    setModeEdit() {
      this.mode = this.$constants.formMode.Edit;
    },

    /**
     * Hoãn:
     */
    postpone() {
      // Gán về object ban đầu
      this.model = Object.assign({}, this.oldData);
      console.log(this.oldDataDetail);
      this.modelDetail = [...this.oldDataDetail];
      // Chuyền về mode xem
      this.mode = this.$constants.formMode.View;
    },
  },

  data() {
    return {
      data: {}, //Chi tiết gọi từ API
      model: {},
      modelDetail: [],
      oldData: {}, // Dữ liệu ban đầu khi bind vào form
      dataDetail: [], // Dữ liệu ban đầu detail khi bind vào form
      serviceList: [],
      serviceDetail: [],
      mode: null,
      isView: false,
      isDetailMaster: false, // có phải detail master không
    };
  },
};
