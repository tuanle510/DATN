<script>
import { defineComponent, computed, getCurrentInstance } from "vue";
import commonFn from "../../../common/commonFn";
import { useValidateControl } from "../../../common/validateControl";
export default defineComponent({
  props: {
    modelValue: { default: null },
    label: {
      type: String,
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    const me = this;
    if (me.$el && !me.$el.getVueInstance) {
      me.$el.getVueInstance = () => {
        return this;
      };
    }
  },
  data() {
    return {
      inputValue: commonFn.formatCurrency(this.modelValue),
    };
  },
  methods: {
    focus() {
      this.$refs.TheInput.focus();
    },
    /**
     * Mô tả : Chỉ nhận input
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 23:44 02/05/2022
     */
    handleKeydown(event) {
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
     * xử lí sự kiện khi nhập input
     * @param {*} event
     */
    onChangeHandler($event) {
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
      this.inputValue = commonFn.formatCurrency(value);
      this.$emit("update:modelValue", Number(value));
      this.validate();
    },

    onFocus() {
      this.$refs.TheInput.select();
    },
  },

  setup(props) {
    const { proxy } = getCurrentInstance();
    const { errorMessage, validate, isValidate } = useValidateControl({
      props,
    });

    /**
     * Hủy lan rộng event
     */
    const cancelEvent = (e) => {
      if (e) {
        if (typeof e.preventDefault === "function") {
          e.preventDefault();
        }

        if (typeof e.stopPropagation === "function") {
          e.stopPropagation();
        }

        if (typeof e.stopImmediatePropagation === "function") {
          e.stopImmediatePropagation();
        }
      }
    };

    const listeners = computed(() => {
      return {
        blur: (e) => {
          cancelEvent(e);
          onBlur(e);
        },
      };
    });

    //Sự kiên blur ra ngoài ô input
    const onBlur = (e) => {
      validate();
    };

    return {
      errorMessage,
      validate,
      isValidate,
      listeners,
    };
  },
});
</script>
<template>
  <div class="m-input-container" :class="{ 'm-validate': isValidate }">
    <div v-if="label" class="m-label">{{ label }}</div>
    <input
      ref="TheInput"
      :class="['m-input', 'm-input-number', { 'm-input-error': errorMessage }]"
      :value="inputValue"
      @input="onChangeHandler"
      @keydown="handleKeydown"
      @focus="onFocus"
      v-on="listeners"
      maxlength="18"
    />
    <div class="m-error-text" v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>
<style scoped>
@import url(../../../css/components/TheInput.css);
.m-input-number {
  text-align: right;
}
</style>
