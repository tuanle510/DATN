<template>
  <div
    v-on:clickout="onClickout"
    class="m-combobox"
    ref="combobox"
    :class="{ 'm-validate': isValidate }"
  >
    <div v-if="label" class="m-label">{{ label }}</div>
    <div class="combobox-contaner" ref="container">
      <input
        type="text"
        ref="input"
        :class="[
          'm-input',
          { 'm-input-error': errorMessage },
          { pr60: quickAddForm },
        ]"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :disabled="isOnlyChoose || disabled"
        @click="onClick"
        @keydown.tab="onTab"
        @focus="setFocus"
        @blur="outFocus"
        @keydown.up="onUp"
        @keydown.down="onDown"
        @input="onChangeHandler"
        @keydown.enter="selectItem"
        :value="this.displayValue"
      />
      <div class="m-quick-add" v-if="quickAddForm && !disabled">
        <div class="add" @click="quickAdd()"></div>
      </div>
      <div @click="toggle()" class="icon-combobox">
        <div v-if="isOptionShow" class="up"></div>
        <div v-else class="down"></div>
      </div>
    </div>
    <div class="m-error-text" v-if="errorMessage">
      {{ errorMessage }}
    </div>
    <Teleport to="body">
      <div
        v-if="isOptionShow && loading"
        class="m-option-loading"
        :style="optionPos"
      >
        <div class="m-option-loading-icon"></div>
      </div>
      <div
        class="m-option-list hust-no-click-out"
        :style="optionPos"
        v-if="isOptionShow && !loading"
        ref="optionList"
      >
        <!-- Dạng bảng -->
        <table v-if="columns && !loading" class="m-option-table">
          <thead>
            <tr class="m-option-table-header">
              <th
                v-for="(col, colindex) in columns"
                :key="colindex"
                :style="genHeaderCss(col, colindex)"
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
              :class="{ 'm-item-selected': this.selecedIndex === rowIndex }"
              @click="choseOption(rowIndex, row)"
            >
              <td
                v-for="(column, colindex) in columns"
                :key="colindex"
                :style="genRowCss(column, colindex)"
              >
                <div class="text-overflow">
                  <span class="td-normal-span" :title="row[column.dataField]">
                    {{ colFormat(row[column.dataField], column.type) }}
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
import commonFn from "@/common/commonFn";
import moment from "moment";
import { useValidateControl } from "@/common/validateControl";
import popupUtil from "@/components/base/DynamicModal/popupUtil";

export default defineComponent({
  name: "the-combobox",
  emits: [
    "blur",
    "keydown",
    "update:modelValue",
    "update:display",
    "selectItem",
    "loadComboboxData",
  ],
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
    // Chỉ cho chọn
    queryMode: {
      type: String,
      default: "local",
    },
    rules: {
      type: Array,
      default: () => [],
    },
    // Chỉ cho chọn
    initValue: {
      default: null,
    },
    loadComboboxData: {
      type: Function,
    },
    disabled: {
      default: false,
    },
    quickAddForm: {
      default: null,
    },
    freeText: {
      default: false,
    },
    reload: {
      default: false,
    },
  },

  computed: {
    forceReload() {
      return this.reloadData || this.reload;
    },
  },

  mounted() {
    const me = this;
    if (me.data) {
      me.datax = [...me.data];
    }
    // Nếu có giá trị thì tìm lại displayValue để hiển thị
    me.$nextTick(() => {
      if (me.initValue) {
        me.displayValue = me.initValue;
      }
    });
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
    isFocus: async function (newValue) {
      if (newValue == false) {
        this.$refs.input.classList.remove("input-focus");
        // Nếu không freeText thì gán giá trị về null
        if (!this.modelValue && !this.freeText) {
          this.displayValue = "";
        }
        // Nếu là freeText thì gán luôn bằng giá trị text
        if (this.freeText && this.displayValue) {
          await this.$emit("update:modelValue", this.displayValue);
          await this.$emit("update:display", this.displayValue);
        }
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
    isOptionShow: async function (newValue) {
      if (newValue == true) {
        // Load remote
        if (this.queryMode == "remote" && (!this.datax || this.forceReload)) {
          this.loading = true;
          // Loading
          this.setOptionListPosition();
          this.datax = await this.loadComboboxData();
          this.reloadData = false;
          this.$nextTick(() => {
            this.setMatches(this.$refs.input.value);
            this.loading = false;
          });
        }
        this.$nextTick(() => {
          this.setselecedIndex();
          this.setOptionListPosition();
          this.scrollToItem();
        });
      }
    },

    initValue: function (newValue) {
      this.displayValue = newValue;
    },
  },

  methods: {
    // Gen css cho header table
    genHeaderCss(item, index) {
      const css = {
        minWidth: item.width + "px",
        width: item.width + "px",
        textAlign: item.align || "left",
      };
      let colIndex = this.columns.findIndex((x) => x.autoRezie == true);
      if (colIndex) {
        if (colIndex == index) {
          delete css.width;
        }
      } else {
        // Nếu là cột cuối thì bỏ fix witdh đi
        if (this.columns && index == this.columns.length - 1) {
          delete css.width;
        }
      }
      return css;
    },

    // Gen css cho row table
    genRowCss(item, index) {
      const css = {
        maxWidth: item.width + "px",
        textAlign: item.align || "left",
      };
      let autoResizeCol = this.columns.filter((x) => x.autoRezie == true);
      if (autoResizeCol) {
        if (autoResizeCol.dataField == item.dataField) {
          delete css.maxWidth;
        }
      } else {
        // Nếu là cột cuối thì bỏ fix witdh đi
        if (this.columns && index == this.columns.length - 1) {
          delete css.maxWidth;
        }
      }
      return css;
    },

    // Format theo kiểu dữ liệu
    colFormat(value, type) {
      switch (type) {
        case "date":
          value = moment(new Date(value)).format("DD/MM/YYYY");
          break;
        case "currency":
          value = commonFn.formatCurrency(value);
          break;
        default:
          break;
      }
      return value;
    },
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
    async onChangeHandler(e) {
      this.isOptionShow = true;
      e.preventDefault();
      let newValue = e.target.value;
      //gán lại giá trị
      this.displayValue = newValue;
      // Gán index về 0:
      this.selecedIndex = 0;
      this.setMatches(newValue);
      // Nếu xóa đi text thì update model về rỗng
      if (newValue == "") {
        await this.$emit("update:modelValue", null);
        await this.$emit("update:display", null);
        this.selecedIndex = null;
        var param = {
          value: null, // giá trị của model
          obj: {}, // cả obj nếu cần gán cho trường khác
        };
        //  truyền cả obj lên cho component cha:
        this.$emit("selectItem", param);
      }
    },

    /**
     * Lọc dữ liệu theo input
     */
    setMatches(value) {
      if (this.datax && this.datax.length > 0) {
        if (value == undefined || value == "") {
          this.matches = this.datax;
        } else {
          this.matches = this.datax.filter((item) =>
            item[this.displayField]
              .toString()
              .toLowerCase()
              .includes(value.toString().toLowerCase())
          );
        }
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
        this.matches = this.datax;
      }
      // this.$refs.input.select();
    },

    /**
     * Cho hàm grid dùng
     */
    focus() {
      this.$refs.input.focus();
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
      if (!this.freeText && this.matches.length == 0) {
        await this.$emit("update:modelValue", null);
        this.displayValue = null;
        await this.$emit("update:display", null);
      } else if (this.freeText) {
        await this.$emit("update:modelValue", this.modelValue);
        await this.$emit("update:display", this.modelValue);
      } else {
        var oldValue = this.modelValue;
        // Chọn theo index của matches list:
        // Lấy obj đã ch gán vào selectedItem
        this.selecedItem = this.matches[this.selecedIndex];
        // Cập nhật giá trị vào input
        await this.$emit(
          "update:modelValue",
          this.selecedItem[this.valueField]
        );
        this.validate();
        this.displayValue = this.selecedItem[this.displayField];
        // Cập nhật giá trị display
        await this.$emit("update:display", this.displayValue);
      }

      // Gán lại matches list thành data:
      this.matches = [...this.datax];

      var param = {
        value: this.modelValue, // giá trị của model
        oldValue: oldValue, // giá trị cũ của model
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
    onUp() {
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
    onDown() {
      // Nếu chưa hiện Option list thì hiển thị
      if (this.isOptionShow == false) {
        this.toggle();
        return;
      }
      // Hiển thị đến cuối thì quay lại đầu
      if (
        this.matches &&
        (this.selecedIndex >= this.matches.length - 1 ||
          this.selecedIndex == null)
      ) {
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
    onTab() {
      // Nếu đang mở dropdown tab là chọn luôn dòng đầu tiên
      if (this.selecedIndex != null && this.isOptionShow) {
        this.selectItem();
      }
      this.isOptionShow = false;
      this.isFocus = false;
    },

    onClickout() {
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
      if (this.disabled) {
        return;
      }
      this.isOptionShow = !this.isOptionShow;
      if (this.$refs.input) {
        this.$refs.input.focus();
      }
    },

    /**
     * Gán giá trị của selected index
     */
    setselecedIndex() {
      if (this.isOptionShow == true && this.datax) {
        // Nếu có modelValue rồi thì gán bằng tât cả
        if (this.modelValue) {
          this.matches = [...this.datax];
        }
        // Nếu có giá trị trùng với giá trị trong combo

        var listValue = this.matches
          ? this.matches.map((x) => x[this.valueField])
          : null;
        if (this.modelValue && listValue.includes(this.modelValue)) {
          this.selecedIndex = listValue.findIndex((x) => x == this.modelValue);
        }
      }
    },

    /**
     * Lấy vị trí hiển thị
     */
    setOptionListPosition() {
      // Chiều dài 1 item
      var item = 30;
      var height = 120;
      // Tính chiều dài của dropdown (cộng 8 là padding 2 đầu)
      if (this.matches && this.matches.length > 0 && !this.loading) {
        height = item * this.matches.length + 8;
      }
      let container = this.$refs.container.getBoundingClientRect();
      let width = this.dropdownWidth || container.width;
      this.optionPos = {
        width: width + "px",
      };

      if (window.innerWidth - container.left < width) {
        this.optionPos.left = container.right - width + "px";
      } else {
        this.optionPos.left = container.left + "px";
      }

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
        if (
          this.isOptionShow == true &&
          this.selecedIndex != null &&
          this.$refs.optionList
        ) {
          this.$refs.optionList.scrollTop = this.selecedIndex * 30;
        }
      });
    },

    /**
     * Thêm nhanh
     * @param {*} quickAddForm
     */
    quickAdd() {
      this.isOptionShow = false;
      if (this.quickAddForm) {
        const param = {
          mode: this.$constants.formMode.Add,
          submit: this.submitQuickAdd,
        };
        popupUtil.show(this.quickAddForm, param);
      }
    },

    /**
     * Sau khi thêm thì bind vào input
     * @param {*} value
     */
    async submitQuickAdd(value) {
      // Thêm vào danh sách data nếu đã load data rồi
      await this.$emit("update:modelValue", value[this.valueField]);
      this.validate();
      this.displayValue = value[this.displayField];
      // Cập nhật giá trị display
      await this.$emit("update:display", this.displayValue);
      // Thêm vào danh sách data nếu đã load data rồi
      this.reloadData = true;
      // Focus vào input
      setTimeout(() => {
        this.$refs.input.focus();
      }, 100);
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
      selecedIndex: null,
      matches: [],
      datax: null,
      selecedItem: {},
      isFocus: false,
      isOptionShow: false,
      optionPos: {},
      displayValue: null,
      loading: false,
      reloadData: false, // load lại danh sách không
    };
  },
});
</script>
<style lang="scss" scoped>
@import url(@/css/components/TheCombobox.scss);
</style>
