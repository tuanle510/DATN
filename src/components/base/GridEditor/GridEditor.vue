<script>
import { getCurrentInstance, ref } from "vue";
import moment from "moment";
import commonFn from "@/common/commonFn";
export default {
  props: {
    // Danh sách cột
    columns: Array,
    // Danh sách dữ liệu
    data: Array,
    disabled: {
      default: false,
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
          value = value ? moment(new Date(value)).format("DD/MM/YYYY") : null;
          break;
        case "currency":
          value = commonFn.formatCurrency(value);
          break;
        default:
          break;
      }
      return value;
    },
    //
    getComponent(type) {
      let component = "TheInput";
      switch (type) {
        case "date":
          component = "TheDatepicker";
          break;
        case "currency":
          component = "TheNumber";
          break;
        default:
          break;
      }
      return component;
    },

    /**
     * Sự kiện click vào cell
     * @param {*} rowIndex
     * @param {*} cellIndex
     */
    startEditing(rowIndex, cellIndex) {
      if (!this.disabled) {
        this.editingCell = {
          row: rowIndex,
          column: cellIndex,
        };
        var ref = `cell_${rowIndex}-${cellIndex}`;
        this.$nextTick(() => {
          if (
            this.$refs[ref] &&
            this.$refs[ref][0] &&
            typeof this.$refs[ref][0].focus === "function"
          ) {
            this.$refs[ref][0].focus();
            // Lưu giá trị trước khi sửa
            this.oldCellValue = this.$refs[ref][0].modelValue;
          }
        });
      }
    },

    endEditing() {
      this.beforeEndEdit();
      this.editingCell = {
        row: null,
        column: null,
      };
    },

    // Check sự thay đổi giá trị
    beforeEndEdit() {
      // Lưu giá trị trước khi chuyển sang ô khác hoặc khong edit nữa
      var ref = `cell_${this.editingCell.row}-${this.editingCell.column}`;
      if (this.$refs[ref] && this.$refs[ref][0]) {
        var newCellValue = this.$refs[ref][0].modelValue;
        // So sánh ngày phải làm thế này thôi
        if (this.columns[this.editingCell.column].type == "date") {
          newCellValue = new Date(newCellValue).setHours(0, 0, 0, 0);
          this.oldCellValue = new Date(this.oldCellValue).setHours(0, 0, 0, 0);
        }
        // Nếu thay đổi giá trị thì gán cho dòng đấy bằng state Sửa
        if (newCellValue != this.oldCellValue) {
          this.data[this.editingCell.row].state = "update";
        }
      }
    },

    // Sự kiện tab
    onTab(rowIndex, cellIndex) {
      const isLastColumn = cellIndex === this.columns.length - 1;
      const isLastRow = rowIndex === this.data.length - 1;
      if (isLastColumn && !isLastRow) {
        this.beforeEndEdit();
        this.startEditing(rowIndex + 1, 0); // Di chuyển sang ô đầu tiên của hàng mới
      } else if (!isLastColumn) {
        this.beforeEndEdit();
        this.startEditing(rowIndex, cellIndex + 1); // Di chuyển sang ô bên cạnh
      } else if (isLastColumn && isLastRow) {
        this.endEditing(); // Kết thúc chỉnh sửa nếu ở ô cuối cùng của bảng
      }
    },

    // Sự kiện Shift + Tab
    onShiftTab(rowIndex, cellIndex) {
      const isFirstColumn = cellIndex === 0;
      const isFirstRow = rowIndex === 0;

      if (isFirstColumn && !isFirstRow) {
        this.startEditing(rowIndex - 1, this.columns.length - 1); // Di chuyển sang ô cuối cùng của hàng trước đó
      } else if (!isFirstColumn) {
        this.startEditing(rowIndex, cellIndex - 1); // Di chuyển sang ô bên cạnh bên trái
      } else if (isFirstColumn && isFirstRow) {
        this.endEditing(); // Kết thúc chỉnh sửa nếu ở ô đầu tiên của bảng
      }
    },

    // Sự kiện click out
    onClikcout(event) {
      if (
        this.editingCell.row != null &&
        this.editingCell.column != null &&
        (!document.querySelector(".dp__menu") ||
          !document.querySelector(".dp__menu").contains(event.relatedTarget))
      ) {
        this.endEditing();
      }
    },
  },
  data() {
    return {
      editingCell: {},
      oldCellValue: null,
    };
  },
};
</script>

<template>
  <div class="m-grid">
    <!-- Table -->
    <div class="m-table-container" ref="MainTable">
      <table class="m-table" v-on:clickout="(event) => onClikcout(event)">
        <!-- Header -->
        <thead>
          <tr>
            <th
              v-for="(column, index) in columns"
              :key="index"
              :style="genHeaderCss(column, index)"
            >
              <div class="th-content">
                <span class="th-title">
                  {{ column.name }}
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <!-- Body -->
        <tbody>
          <tr
            v-for="(row, rowIndex) in data"
            :key="rowIndex"
            :class="[{ 'm-tr-seleced': editingCell.row == rowIndex }, 'm-tr']"
          >
            <!-- :title="row[column.dataField]" -->
            <td
              v-for="(column, cellIndex) in columns"
              :key="cellIndex"
              :style="genRowCss(column, cellIndex)"
              @keydown.tab.exact.prevent="onTab(rowIndex, cellIndex)"
              @keydown.shift.tab.prevent="onShiftTab(rowIndex, cellIndex)"
              @click.prevent="startEditing(rowIndex, cellIndex)"
            >
              <component
                :ref="`cell_${rowIndex}-${cellIndex}`"
                v-if="
                  editingCell.row === rowIndex &&
                  editingCell.column === cellIndex &&
                  !disabled
                "
                :is="getComponent(column.type)"
                v-model="row[column.dataField]"
              ></component>
              <div v-else class="text-overflow editor-click">
                <span class="td-normal-span">{{
                  colFormat(row[column.dataField], column.type)
                }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="m-footer-container">
      <div class="m-footer-total">
        Tổng số: &nbsp; <strong>{{ data.length }}</strong> &nbsp;bản ghi
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url(@/css/components/GridEditor.scss);

.m-footer-total {
  position: sticky;
  left: 13px;
}
.editor-click {
  padding: 0 10px;
}
</style>
