<template>
  <div class="datepicker-container" :class="{ 'm-validate': isValidate }">
    <div v-if="label" class="m-label">{{ label }}</div>
    <Datepicker
      ref="datepicker"
      class="datepicker-content"
      locale="vi-VN"
      cancelText="Hủy"
      selectText="Chọn"
      format="dd/MM/yyyy"
      :enableTimePicker="false"
      :maxDate="maxDate"
      :minDate="minDate"
      :disabled="disabled"
      textInput
      autoApply
      @blur="onBlur"
      @closed="onClosePicker"
      v-model="date"
      @update:modelValue="handleDate"
      @input="onInput"
      @keydown="onKeypress"
      :text-input="textInputOptions"
      :inputClassName="errorMessage ? 'm-input m-input-error' : 'm-input '"
      menu-class-name="hust-no-click-out"
      :day-names="['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']"
      :teleport="true"
    >
      <template #clear-icon="{}"></template>
    </Datepicker>
    <div class="m-error-text" v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>
<script>
import Datepicker from "@vuepic/vue-datepicker";
import { defineComponent, getCurrentInstance } from "vue";
import { useValidateControl } from "@/common/validateControl";

export default defineComponent({
  components: { Datepicker },

  props: {
    modelValue: {
      default: null,
    },
    label: {
      default: null,
    },
    disabled: {
      default: false,
    },
    rules: {
      type: Array,
      default: () => [],
    },
    minDate: {},
    maxDate: {},
    textInputOptions: {
      default: {
        openMenu: true,
      },
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

  watch: {
    /**
     * Hiển thị Option list thì gán lại css
     * @param {*} newValue
     */
    modelValue: function (newValue) {
      if (newValue) {
        this.date = newValue;
      }
    },
  },
  setup(props) {
    const { proxy } = getCurrentInstance();
    const { errorMessage, validate, isValidate } = useValidateControl({
      props,
    });

    return {
      errorMessage,
      validate,
      isValidate,
    };
  },
  methods: {
    onInput(event) {
      let input = event.target.value;
      if (input == null || input == "") {
        this.handleDate();
      }
      if (input.length >= 2 && input.charAt(2) !== "/") {
        input = input.slice(0, 2) + "/" + input.slice(2);
      }
      if (input.length >= 5 && input.charAt(5) !== "/") {
        input = input.slice(0, 5) + "/" + input.slice(5);
      }
      event.target.value = input;
      if (input && input.length == 10) {
        const [day, month, year] = input.split("/").map(Number);
        const dateObject = new Date(year, month - 1, day);
        this.handleDate(dateObject);
      }
    },

    onKeypress(event) {
      // Lấy mã phím
      const keyCode = event.keyCode;
      const isCtrlPressed = event.ctrlKey || event.metaKey; // Kiểm tra xem Ctrl hoặc Command (Mac) đã được nhấn
      const input = event.target.value;
      console.log(input);
      if (
        !(
          (
            (keyCode >= 48 && keyCode <= 57 && input.length < 10) ||
            (keyCode >= 96 && keyCode <= 105 && input.length < 10) ||
            [8, 9, 37, 39, 46].includes(keyCode) || // Phím Backspace, Tab, Left/Right Arrow, Delete
            (isCtrlPressed && [65, 67, 86].includes(keyCode))
          ) // Phím tắt Ctrl + A, Ctrl + C, Ctrl + V
        )
      ) {
        event.preventDefault();
      }
      if (keyCode === 8 || keyCode === 46) {
        // Kiểm tra phím xóa hoặc backspace
        let input = event.target.value;
        if (input.charAt(input.length - 1) === "/") {
          event.target.value = input.slice(0, -1); // Xóa chữ trước dấu '/'
        }
      }
    },

    onKeyup(value) {
      this.$emit("onKeyup", value);
    },
    /**
     * Mô tả : câp nhât giá trị v-model
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 00:35 31/05/2022
     */
    async handleDate(value) {
      if (value) {
        value = new Date(value).getDateOnly();
        await this.$emit("update:modelValue", value);
      } else {
        await this.$emit("update:modelValue", null);
      }
      this.onKeyup(value);
      this.validate();
    },

    onClosePicker() {
      this.focus();
    },

    /**
     * Mô tả : Xử lí sự kiện blur
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 01:12 31/05/2022
     */
    onBlur() {
      var mess = this.validate();
      if (mess) {
        this.inputClassName = "m-input m-input-error";
      } else {
        this.inputClassName = "";
      }
    },

    /**
     * sự kiện focus để component cha dùng
     */
    focus() {
      const $el = this.$el;
      $el.getElementsByClassName("dp__input")[0].focus();
    },
  },

  data() {
    return { date: this.modelValue, inputClassName: "m-input" };
  },
});
</script>
<style lang="css">
@import "@vuepic/vue-datepicker/dist/main.css";
.datepicker-content {
  --dp-border-radius: 2.5px;
  --dp-border-color: #afafaf;
  --dp-font-family: MISA Font;
  --dp-button-icon-height: 0px;
  --dp-input-padding: 6px 10px 6px 12px;
}

.dp__input {
  height: 30px;
  font-size: 13px !important;
  transition: none;
}

.th-filter-input input.dp__input {
  height: 25px;
  border: none;
}

.th-filter-input input.dp__input:focus,
.th-filter-input input.dp__input:hover {
  height: 25px;
  border: none;
}

.th-filter-input input.dp__input {
  height: 25px;
  border: none;
}

input.m-input:focus {
  border: 1px solid #22a7ca;
}
input.m-input:hover {
  border: 1px solid #22a7ca;
}

.dp__disabled:hover {
  border: 1px solid #afafaf !important;
}

/* Trong trường hợp grid editor  */
tr td .dp__input,
tr th .dp__input {
  --dp-input-icon-padding: 10px;
  --dp-input-padding: 0;
  border-color: transparent !important;
}
tr td .dp__icon,
tr th .dp__icon {
  display: none;
}
tr td .dp__input:focus {
  border-color: #22a7ca !important;
}
</style>
