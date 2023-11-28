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
        :disabled="isOnlyChoose"
        @click="onClick"
        @keydown.tab="tab"
        @focus="setFocus"
        @blur="outFocus"
        @keydown.up="up"
        @keydown.down="down"
        @input="onChangeHandler"
        @keydown.enter="selectItem"
        :value="this.displayValue"
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
            {{ option[this.displayField] }}
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
    /**
     * trường lấy giá trị value
     */
    valueField: {
      default: null,
    },
    /**
     * trường lấy giá trị hiển thị
     */
    displayField: {
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
    // Vị trí của dropdown: Trên = top, Dưới = bottom
    position: {
      type: String,
      default: "bottom",
    },
    // Chỉ cho chọn
    isOnlyChoose: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    const me = this;
    // Nếu có giá trị thì tìm lại displayValue để hiển thị
    if (me.data && this.modelValue) {
      me.displayValue = me.data.find(
        (x) => x[me.valueField] == this.modelValue
      )[this.displayField];
    }
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
        this.scrollToItem();
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
      if (this.isOnlyChoose) {
        this.isOptionShow = true;
      } else {
        this.setFocus();
      }
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
      this.displayValue = newValue;
      // Gán index về 0:
      this.selecedIndex = 0;
      this.setMatches(newValue);
    },

    /**
     * Lọc dữ liệu theo input
     */
    setMatches(value) {
      if (value == undefined || value == "") {
        this.matches = this.data;
      } else {
        this.matches = this.data.filter((item) =>
          item[this.displayField]
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase())
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
      // this.$refs.input.select();
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
      // Chọn theo index của matches list:
      // Lấy obj đã ch gán vào selectedItem
      this.selecedItem = this.matches[this.selecedIndex];
      // Cập nhật giá trị vào input
      await this.$emit("update:modelValue", this.selecedItem[this.valueField]);

      this.displayValue = this.selecedItem[this.displayField];

      // Gán lại matches list thành data:
      this.matches = [...this.data];

      var param = {
        value: this.modelValue, // giá trị của model
        obj: this.selecedItem, // cả obj nếu cần gán cho trường khác
      };
      //  truyền cả obj lên cho component cha:
      this.$emit("selectItem", param);
      // Validate lại dữ liệu:
      this.isOptionShow = false;
      // Bôi đen chữ
      // this.$refs.input.select();
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
      if (this.isOptionShow == true) {
        this.matches = [...this.data];
        // Nếu có giá trị trùng với giá trị trong combo
        var listValue = this.matches.map((x) => x[this.valueField]);
        if (this.modelValue && listValue.includes(this.modelValue)) {
          this.selecedIndex = listValue.findIndex((x) => x == this.modelValue);
        }
      }
      this.$refs.input.focus();
    },

    /**
     * Lấy vị trí hiển thị
     */
    setOptionListPosition() {
      // Chiều dài 1 item
      const item = 30;
      // Tính chiều dài của dropdown (cộng 8 là padding 2 đầu)
      var height = item * this.matches.length + 8;
      let container = this.$refs.container.getBoundingClientRect();
      this.optionPos = {
        left: container.left + "px",
        width: (this.dropdownWidth || container.width) + "px",
      };
      if (this.position == "bottom") {
        this.optionPos.top = container.top + container.height + "px";
      } else if (this.position == "top") {
        this.optionPos.top = container.top - height + "px";
      }
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
      selecedItem: {},
      isFocus: false,
      isOptionShow: false,
      optionPos: {},
      displayValue: null,
    };
  },
});
</script>
<style lang="scss" scoped>
@import url(../../../css/components/TheCombobox.scss);
</style>
