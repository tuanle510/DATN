import { $vfm } from "vue-final-modal";
import { formMode } from "../enum/formMode";
import axios from "axios";

export default {
  async mounted() {
    const me = this;
    // Gọi dữ liệu
    await me.getData(me._formParam);
    // Gán thêm dữ liệu trc khi binddata nếu cần
    this.beforeBinđData(this.data);
    this.binđData(this.data);
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
    beforeClose() {
      //Chưa biết xư lí gì
      console.log("beforeclose");
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
        res = await axios.get("ChuNha/new");
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
        const res = await axios.get(`ChuNha/${param.id}`);
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
      this.oldData = data;
    },
    /**
     * Đóng form
     */
    hide() {
      const me = this;
      me._popup.value = false;
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
