import { ref } from 'vue';
export default {
  props: {},
  setup() {},
  methods: {
    // Xử lí trước khi cất
    beforeSave() {
      console.log('beforeSave');
    },
    // Thêm mới
    save() {
      console.log('Add');
      this.close();
    },
    // Đóng popup
    close() {
      var modalName = this.modalName;
      this.$refs[modalName]?.close();
    },
  },
};
