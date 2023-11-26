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
      :maxDate="new Date()"
      textInput
      autoApply
      @blur="onBlur"
      @closed="onClosePicker"
      v-model="date"
      @update:modelValue="handleDate"
      @onInput="onInput"
      :inputClassName="errorMessage ? 'm-input m-input-error' : 'm-input '"
      :day-names="['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']"
      :teleport="true"
    >
    </Datepicker>
    <div class="m-error-text" v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>
<script>
import Datepicker from "@vuepic/vue-datepicker";
import { defineComponent, getCurrentInstance } from "vue";
import { useValidateControl } from "../../../common/validateControl";

export default defineComponent({
  components: { Datepicker },

  props: {
    modelValue: {
      default: null,
    },
    label: {
      default: null,
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
    onInput() {
      this.validate();
    },
    /**
     * Mô tả : câp nhât giá trị v-model
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 00:35 31/05/2022
     */
    async handleDate(value) {
      this.date = value;
      await this.$emit("update:modelValue", this.date);
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
}

.dp__input {
  height: 30px;
  font-size: 13px !important;
  transition: none;
}

input.m-input:focus {
  border: 1px solid #22a7ca;
}
input.m-input:hover {
  border: 1px solid #22a7ca;
}

/* Trong trường hợp grid editor  */
tr td .dp__input {
  --dp-input-icon-padding: 0px;
  --dp-input-padding: 0;
  border-color: transparent !important;
  text-align: center;
}
tr td .dp__icon {
  display: none;
}
tr td .dp__input:focus {
  border-color: #22a7ca !important;
}
/* .calendar-next-enter-active,
.calendar-next-leave-active,
.calendar-prev-enter-active,
.calendar-prev-leave-active {
  transition: all 0s ease-out !important;
}

.dp-menu-appear-enter-active,
.dp-menu-appear-leave-active,
.dp-slide-up-enter-active,
.dp-slide-up-leave-active,
.dp-slide-down-enter-active,
.dp-slide-down-leave-active {
  transition: all 0s ease-out !important;
}

.dp-slide-down-leave-to,
.dp-slide-up-enter-from {
  opacity: 0;
  transform: none !important;
}

.calendar-next-enter-from {
  opacity: 0;
  transform: none !important;
}

.calendar-next-leave-to {
  opacity: 0;
  transform: none !important;
}

.calendar-prev-enter-from {
  opacity: 0;
  transform: none !important;
}

.dp__menu {
  font-family: MISA Font !important;
  font-size: 13px !important;
}
.dp__main {
  height: 30px;
}
.dp__input_wrap {
  height: 30px !important;
  font-family: MISA Font !important;
  font-size: 14px !important;
  transition: none !important;
}
.dp__input_icon_pad {
  padding-left: 14px !important;
  border: 1px solid #afafaf !important;
}

.dp__input_focus {
  border: 1px solid #22a7ca !important;
}

.dp__input_icon {
  right: 0 !important;
}

.dp__input_icons {
  display: none !important;
}

.datepicker-container {
  position: relative;
}

.datepicker-container .m-label {
  padding-bottom: 8px;
  font-size: 13px;
  font-weight: 700;
  line-height: 15px;
}

.datepicker-container .datepicker-icon {
  background: url("../../assets/icon/qlts-icon.png") no-repeat -287px -67px;
  width: 18px;
  height: 18px;
  position: absolute;
  right: 10px;
  top: 25%;
} */
</style>
