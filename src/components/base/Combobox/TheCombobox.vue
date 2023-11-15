<template>
  <div v-on:clickout="tab" class="m-combobox" ref="combobox">
    <div v-if="label" class="m-label">{{ label }}</div>
    <div class="combobox-contaner">
      <div v-if="hasIcon" class="combobox-icon">
        <div class="filter"></div>
      </div>
      <input
        type="text"
        ref="input"
        :required="required"
        :class="!hasIcon ? 'input-no-icon' : 'input-icon'"
        :title="title"
        :maxlength="maxlength"
        :placeholder="placeholder"
        @click="onClick"
        @keydown.tab="tab"
        @focus="setFocus"
        @blur="outFocus"
        @keydown.up="up"
        @keydown.down="down"
        @input="onChangeHandler"
        @keydown.enter="selectItem"
        :value="this.modelValue"
      />

      <div
        style="position: absolute; right: 0"
        @click="toggle()"
        class="icon-combobox"
      >
        <div v-if="isOptionShow" class="up"></div>
        <div v-else class="down"></div>
      </div>
    </div>
    <ul class="m-option-list" v-if="isOptionShow" ref="data">
      <li
        v-for="(option, index) in matches"
        :key="index"
        class="m-option-item"
        @click="choseOption(index, option)"
        :class="{ 'm-item-selected': this.selecedIndex == index }"
      >
        <div class="item-text-limit">
          {{ option[this.filterby] }}
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import "clickout-event";
export default {
  name: "the-combobox",
  emits: ["blur", "keydown", "update:modelValue", "selectItem"],

  props: [
    "hasIcon",
    "placeholder",
    "filterby",
    "data",
    "modelValue",
    "required",
    "title",
    "maxlength",
    "label",
  ],

  watch: {
    /**
     * Mô tả : Khi nào đóng data thì validate
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 23:56 28/05/2022
     */
    isFocus: function (newValue) {
      if (newValue == false) {
        this.$refs.input.classList.remove("input-focus");

        this.validateRequired();
      } else {
        this.$refs.input.classList.add("input-focus");
      }
    },

    selecedIndex: function (newValue, oldValue) {
      if (newValue != oldValue) {
        this.scrollToItem();
      }
    },

    // Theo dõi giá trị mới của input để hiển thị data
    modelValue: function (newValue) {
      // Hiển thị option list:
      this.isOptionShow = true;
      // Gán index về 0:
      this.selecedIndex = 0;

      if (newValue == undefined || newValue == "") {
        this.matches = this.data;
      } else {
        this.matches = this.data.filter((item) =>
          item[this.filterby]
            .toLowerCase()
            .includes(this.modelValue.toLowerCase())
        );
      }
    },
  },

  methods: {
    /**
     * Mô tả : chọn ô input thì bôi đen chữ
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 20:59 30/05/2022
     */
    onClick() {
      this.isToggle = false;
      this.setFocus();
    },
    /**
     * Mô tả : Lấy giá trị từ v-model bên cha
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 00:00 02/05/2022
     */
    onChangeHandler(e) {
      e.preventDefault();
      //gán lại giá trị
      this.$emit("update:modelValue", e.target.value);
    },

    /**
     * Mô tả : khi focus vào thì hiện out line, blur thì bỏ outline
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 11:23 30/04/2022
     */
    setFocus() {
      this.isFocus = true;
      // Nếu chưa nhập gì thì matches list hiển thị tất cả
      if (this.$refs.input.value == null || this.$refs.input.value == "") {
        this.matches = this.data;
      }

      if (this.isToggle == true) {
        // Hiển thị option List:
        this.isOptionShow = !this.isOptionShow;
      } else {
        this.isOptionShow = true;
      }

      // Hiển thị theo vị trí của index được chọn:
      this.scrollToItem();

      // Bôi đen tất cả text
      this.$refs.input.select();
    },

    // outFocus() {
    //   this.isFocus = false;
    // },

    /**
     * Mô tả : Validate required
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 16:54 06/05/2022
     */
    validateRequired() {
      if (
        this.required &&
        (this.modelValue === undefined || this.modelValue.trim() === "")
      ) {
        this.$refs.input.classList.add("m-input-error");
      } else {
        this.$refs.input.classList.remove("m-input-error");
      }
    },

    /**
      //  * Mô tả : clear input
      //  * @param
      //  * @return
      //  * Created by: Lê Thiện Tuấn - MF1118
      //  * Created date: 14:52 28/04/2022
      //  */
    // clearInput() {
    //   this.$emit("update:modelValue");
    //   this.isOptionShow = false;
    //   // this.validateRequired();
    //   this.selecedIndex = 0;
    // },

    /**
     * Mô tả : xử lí sự kiện onClick vào data
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 15:31 28/04/2022
     */
    choseOption(index) {
      this.selecedIndex = index;
      this.selectItem();
      this.toggle();
    },

    /**
     * Mô tả : Chọn item
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 12:32 22/05/2022
     */
    async selectItem() {
      // 1. Chọn theo index của matches list:
      // 1.1 Lấy obj đã ch gán vào selectedItem
      this.selecedItem = this.matches[this.selecedIndex];
      // 1.2 Cập nhật giá trị vào input
      await this.$emit(
        "update:modelValue",
        this.matches[this.selecedIndex][this.filterby]
      );

      // 2. Tìm lại index của giá trị đã chọn theo List đầy đủ:
      // 2.1 Tìm index của selectItem trong mảng ban đầu ( không phải mảng matches):
      this.selecedIndex = this.data.findIndex((object) => {
        return object === this.selecedItem;
      });
      // 2.2 Gán lại matches list thành data:
      this.matches = [...this.data];

      //  truyền cả obj lên cho component cha:
      this.$emit("selectItem", this.selecedItem);
      // Validate lại dữ liệu:
      this.isOptionShow = false;
      // Bôi đen chữ
      this.$refs.input.select();
    },

    /**
     * Mô tả : Ấn nút lên thay đổi index của option
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 22:47 28/05/2022
     */
    up() {
      // Nếu index bằng không thì không ấn được nữa
      if (this.selecedIndex == 0) {
        this.selecedIndex = this.matches.length - 1;
        return;
      }
      this.selecedIndex -= 1;
    },

    /**
     * Mô tả :  Ấn nút xuống thay đổi index của option
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 22:48 28/05/2022
     */
    down() {
      if (this.selecedIndex >= this.matches.length - 1) {
        this.selecedIndex = 0;
        return;
      }
      this.selecedIndex += 1;
    },

    /**
     * Mô tả : Ấn tab thì đóng data
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 22:48 28/05/2022
     */
    tab() {
      this.isOptionShow = false;
      this.isFocus = false;
    },

    /**
     * Mô tả : Ấn vào nút mũi tên hiển thị/ tắt data
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 10:21 08/05/2022
     */
    toggle() {
      this.isToggle = true;
      // this.isOptionShow = false;
      this.$refs.input.focus();
    },

    /**
     * Mô tả : Hiển thị theo index của selected item
     * @param
     * @return
     * Created by: Lê Thiện Tuấn - MF1118
     * Created date: 22:49 28/05/2022
     */
    scrollToItem() {
      this.$nextTick(() => {
        if (this.isOptionShow == true) {
          this.$refs.data.scrollTop = this.selecedIndex * 36;
        }
      });
    },
  },

  data() {
    return {
      selecedIndex: 0,
      matches: [],
      selecedItem: null,
      isFocus: false,
      isOptionShow: false,
      isToggle: false,
    };
  },
};
</script>
<style scoped>
.m-combobox {
  position: relative;
  border-radius: 2.5px;
  border: none;
  outline: none;
}

.m-combobox .m-label {
  padding-bottom: 8px;
  font-size: 13px;
  font-weight: 700;
  line-height: 15px;
}

.m-combobox .combobox-contaner {
  z-index: 2;
  border-radius: 2.5px;
  height: 30px;
  display: flex;
  align-items: center;
  background-color: #fff;
  position: relative;
  width: 100%;
}

.m-combobox .combobox-contaner input {
  border: 1px solid #afafaf;
  border-radius: 2.5px;
  font-size: 13px;
  width: 100%;
  height: 100%;
  outline: none;
}

.m-combobox .combobox-contaner input:focus {
  border: 1px solid #22a7ca !important;
}

.m-combobox .combobox-contaner .input-focus {
  border: 1px solid #22a7ca !important;
}

.combobox-icon {
  position: absolute;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
}

.m-combobox .combobox-no-icon {
  display: none;
}

.m-combobox .input-no-icon {
  width: 100%;
  padding-left: 14px !important;
  padding-right: 20px;
}

.m-combobox .input-icon {
  width: 100%;
  padding-left: 36px !important;
  padding-right: 20px;
}

.m-option-list {
  position: absolute;
  top: 36px;
  border-radius: 2.5px;
  background-color: #fff;
  width: 100%;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  z-index: 5;
  max-height: 152px;
  overflow: auto;
}

.m-option-list .m-option-item {
  cursor: pointer;
  border-radius: 2.5px;
  padding-left: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  margin: 0px 4px;
}

.m-option-list .m-option-item .item-text-limit {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.m-option-list .combobox-selected {
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.m-option-list .m-option-item:first-child {
  margin-top: 4px;
}
.m-option-list .m-option-item:last-child {
  margin-bottom: 4px;
}

.m-option-list .m-option-item:hover,
.m-option-list .m-option-item-hover {
  background-color: #c7e0f5;
}

.m-option-list .m-option-item.m-item-selected {
  background-color: #c7e0f5;
}

.m-option-list .m-option-item .option-item-box {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
}

.icon-combobox {
  height: 100%;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.m-option-list::-webkit-scrollbar {
  width: 5px;
  height: 2px;
}

.m-option-list::-webkit-scrollbar-track {
  background: rgb(217, 217, 217);
}

.m-option-list::-webkit-scrollbar-thumb {
  background: #afafaf;
  border-radius: 10000px;
}

.m-option-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
