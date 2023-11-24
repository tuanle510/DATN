<template>
  <div
    v-on:clickout="tab"
    class="m-combobox"
    ref="combobox"
    :class="{ 'm-validate': isValidate }"
  >
    <div v-if="label" class="m-label">{{ label }}</div>
    <div class="combobox-contaner" ref="container">
      <input
        type="text"
        ref="input"
        :class="['m-input', { 'm-input-error': errorMessage }]"
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
    <div class="m-error-text" v-if="errorMessage">
      {{ errorMessage }}
    </div>
    <Teleport to="body">
      <div
        class="m-option-list"
        :style="optionPos"
        v-if="isOptionShow"
        ref="optionList"
      >
        <!-- Dạng bảng -->
        <table v-if="columns" class="m-option-table">
          <thead>
            <tr class="m-option-table-header">
              <th
                v-for="(col, colindex) in columns"
                :key="colindex"
                :style="{ width: col.width + 'px', textAlign: col.align }"
              >
                {{ col.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, rowIndex) in matches"
              :key="rowIndex"
              class="m-option-table-item"
              :class="{ 'm-item-selected': this.selecedIndex == rowIndex }"
              @click="choseOption(rowIndex, row)"
            >
              <td v-for="(column, colindex) in columns" :key="colindex">
                <div class="text-overflow">
                  <span class="td-normal-span" :title="row[column.dataField]">
                    {{ row[column.dataField] }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Dạng dropdown bình thường -->
        <div
          v-else
          v-for="(option, index) in matches"
          :key="index"
          class="m-option-item"
          @click="choseOption(index, option)"
          :class="{ 'm-item-selected': this.selecedIndex == index }"
        >
          <div class="item-text-limit">
            {{ option[this.filterby] }}
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
<script>
import "clickout-event";
import { defineComponent, getCurrentInstance } from "vue";
import { useValidateControl } from "../../../common/validateControl";
export default defineComponent({
  name: "the-combobox",
  emits: ["blur", "keydown", "update:modelValue", "selectItem"],
  props: {
    modelValue: {
      default: null,
    },
    data: {
      default: null,
    },
    maxlength: {
      default: null,
    },
    placeholder: {
      default: null,
    },
    filterby: {
      default: null,
    },
    label: {
      default: null,
    },
    columns: {
      default: null,
    },
    dropdownWidth: {
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
        this.validate();
      } else {
        this.$refs.input.classList.add("input-focus");
      }
    },

    selecedIndex: function (newValue, oldValue) {
      if (newValue != oldValue) {
        this.scrollToItem();
      }
    },

    /**
     * Hiển thị Option list thì gán lại css
     * @param {*} newValue
     */
    isOptionShow: function (newValue) {
      if (newValue == true) {
        this.setOptionListPosition();
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
      this.isOptionShow = true;
      e.preventDefault();
      let newValue = e.target.value;
      //gán lại giá trị
      this.$emit("update:modelValue", newValue);
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

      // if (this.isToggle == true) {
      //   // Hiển thị option List:
      //   this.isOptionShow = !this.isOptionShow;
      // } else {
      //   this.isOptionShow = true;
      // }

      // Hiển thị theo vị trí của index được chọn:
      // this.scrollToItem();

      // Bôi đen tất cả text
      this.$refs.input.select();
    },

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
      // Nếu chưa hiện Option list thì hiển thị
      if (this.isOptionShow == false) {
        this.toggle();
        return;
      }
      // Hiển thị đến cuối thì quay lại đầu
      if (this.selecedIndex >= this.matches.length - 1) {
        this.selecedIndex = 0;
        return;
      }
      // Xuống dòng dưới
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
      this.isOptionShow = !this.isOptionShow;
      this.$refs.input.focus();
    },

    /**
     * Lấy vị trí hiển thị
     */
    setOptionListPosition() {
      let container = this.$refs.container.getBoundingClientRect();
      this.optionPos = {
        top: container.top + container.height + "px",
        left: container.left + "px",
        width: (this.dropdownWidth || container.width) + "px",
      };
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
          this.$refs.optionList.scrollTop = this.selecedIndex * 30;
        }
      });
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
  data() {
    return {
      selecedIndex: 0,
      matches: [],
      selecedItem: null,
      isFocus: false,
      isOptionShow: false,
      optionPos: {},
    };
  },
});
</script>
<style lang="scss" scoped>
@import url(../../../css/components/TheCombobox.scss);
</style>
