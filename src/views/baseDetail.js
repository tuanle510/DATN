import { formMode } from "../enum/formMode";

export default {
  mounted() {
    const me = this;
    me.show(me._formParam);
  },
  methods: {
    /**
     * Sự kiện mở form
     * @param {*} e
     * @param {*} close
     */
    beforeOpen(e, close) {
      const me = this;
      me._formParam = e.ref.params._rawValue;
    },

    /**
     * Sự kiện trước khi đóng form
     */
    beforeClose() {
      //Chưa biết xư lí gì
    },

    /**
     * Show form dựa theo mode truyền vào
     * @param {*} param
     */
    show(param) {
      const me = this;
      // Case theo mode
      const editMode = param.mode;
      switch (editMode) {
        case formMode.Add:
          me.add();
          break;
        case formMode.View:
          me.view();
          break;
        case formMode.Edit:
          me.edit();
          break;
        default:
          break;
      }
    },

    /**
     * Gọi dữ liệu mới theo entity
     */
    add() {
      //Load data mới
      console.log("add");
    },

    /**
     * Gọi dữ liệu theo id
     */
    edit() {
      //Load data mới
      console.log("edit");
    },
  },
};
