<template>
  <div class="datepicker-container">
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
      @blur="setBlur"
      @focus="setFocus"
      v-model="date"
      @update:modelValue="handleDate"
      :inputClassName="inputClassName"
      :day-names="['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']"
    >
    </Datepicker>
    <!-- :required="required" -->
  </div>
</template>
<script>
import Datepicker from "@vuepic/vue-datepicker";

export default {
  components: { Datepicker },

  props: ["modelValue", "required", "label"],
  mounted() {},
  methods: {
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

    /**
     * Mô tả : Xử lí sự kiện focus
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 01:12 31/05/2022
     */
    setFocus() {
      this.inputClassName = "m-input-focus";
    },

    /**
     * Mô tả : Xử lí sự kiện blur
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 01:12 31/05/2022
     */
    setBlur() {
      this.inputClassName = "";
      this.validateRequired();
    },

    /**
     * Mô tả : Validate bắt buộc nhập
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 01:12 31/05/2022
     */
    validateRequired() {
      if (this.required == true && (this.date == null || this.date == "")) {
        this.inputClassName = "m-input-error";
      } else {
        this.inputClassName = "";
      }
    },
  },

  data() {
    return { date: this.modelValue, inputClassName: null };
  },
};
</script>
<style lang="css">
@import "@vuepic/vue-datepicker/dist/main.css";
.datepicker-content {
  --dp-border-radius: 2.5px;
  --dp-border-color: #afafaf;
  --dp-font-family: MISA Font;
}

.dp__input {
  height: 30px;
  font-size: 13px !important;
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
