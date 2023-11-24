<template>
  <div class="m-input-container">
    <div v-if="label" class="m-label">{{ label }}</div>
    <input
      ref="TheInput"
      class="m-input m-input-number"
      :value="inputValue"
      @input="handleInput"
      @keydown="handleKeydown"
      @focus="onFocus"
      maxlength="18"
    />
  </div>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
    },
  },
  data() {
    return {
      inputValue: this.formatCurrency(this.modelValue),
    };
  },
  methods: {
    /**
     * Mô tả : Chỉ nhận input
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 23:44 02/05/2022
     */
    handleKeydown($event) {
      // Lấy mã phím
      const keyCode = event.keyCode;
      const isCtrlPressed = event.ctrlKey || event.metaKey; // Kiểm tra xem Ctrl hoặc Command (Mac) đã được nhấn

      // Chặn các phím không phải số nhưng vẫn cho phép các phím tắt Ctrl + A, Ctrl + C, Ctrl + V
      if (
        !(
          (keyCode >= 48 && keyCode <= 57) ||
          (keyCode >= 96 && keyCode <= 105) ||
          [8, 9, 37, 39, 46].includes(keyCode) ||
          (isCtrlPressed && [65, 67, 86].includes(keyCode))
        )
      ) {
        event.preventDefault();
      }
    },

    /**
     * Hàm format tiền
     * @param {*} value
     */
    formatCurrency(value) {
      return parseFloat(value)
        .toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
          currencyDisplay: "narrowSymbol",
        })
        .replace("₫", "")
        .trim();
    },

    /**
     * xử lí sự kiện khi nhập input
     * @param {*} event
     */
    handleInput($event) {
      let value = $event.target.value;

      // Loại bỏ các ký tự không phải là số hoặc dấu thập phân
      value = value.replaceAll(".", "");

      // Xử lý nếu giá trị trống
      if (value === "") {
        this.inputValue = "";
        this.$emit("update:modelValue", null);
        return;
      }

      // Xử lý nếu giá trị không rỗng
      this.inputValue = this.formatCurrency(value);
      this.$emit("update:modelValue", value);
    },

    onFocus() {
      this.$refs.TheInput.select();
    },
  },
};
</script>
<style scoped>
@import url(../../../css/components/TheInput.css);
.m-input-number {
  text-align: right;
}
</style>
