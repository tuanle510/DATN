<script>
import { getCurrentInstance, ref } from "vue";
import moment from "moment";
import commonFn from "@/common/commonFn";
export default {
  emits: ["update:list"],
  props: {
    // Danh sách cột
    columns: Array,
    // Danh sách dữ liệu
    data: Array,
    idField: String,
    disabled: {
      default: false,
    },
    showFooter: {
      default: true,
    },
    propsData: {
      default: {},
    },
  },

  computed: {
    count() {
      return this.data
        ? this.data.filter((x) => x.state != "delete").length
        : 0;
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
        case "combobox":
          component = "TheComboBox";
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
      // Nêu đang edit thì dừng edit đã r tính tiếp
      if (this.editingCell.row != null && this.editingCell.column != null) {
        this.endEditing();
      }
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
      if (this.data[this.editingCell.row].state == "update") {
        return;
      }
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
        if (
          newCellValue != this.oldCellValue &&
          this.data[this.editingCell.row].state !== "insert"
        ) {
          if (this.data[this.editingCell.row].state == "empty") {
            this.data[this.editingCell.row].state = "insert";
          } else {
            this.data[this.editingCell.row].state = "update";
          }
        }
      }
    },

    // Sự kiện tab
    onTab(rowIndex, cellIndex) {
      const isLastColumn = cellIndex === this.columns.length - 1;
      const isLastRow = rowIndex === this.data.length - 1;
      if (isLastColumn && !isLastRow) {
        this.startEditing(rowIndex + 1, 0); // Di chuyển sang ô đầu tiên của hàng mới
      } else if (!isLastColumn) {
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
        (!document.querySelector(".hust-no-click-out") ||
          !document
            .querySelector(".hust-no-click-out")
            .contains(event.relatedTarget))
      ) {
        this.endEditing();
      }
    },

    // Thêm dòng
    async addRow(index) {
      this.editingCell = {
        row: null,
        column: null,
      };
      if (this.disabled) {
        return;
      }
      let newRow = {
        [this.idField]: commonFn.genGuid(),
        state: "empty",
      };
      this.data.splice(index + 1, 0, newRow);
      await this.$emit("update:list", this.data);
    },

    // Xóa dòng
    async removeRow(index, row) {
      this.editingCell = {
        row: null,
        column: null,
      };
      // nếu trang thái đang là thêm thì bỏ luôn đi
      if ((row.state && row.state == "insert") || row.emptyRow) {
        let datax = this.data.filter(
          (x) => x[this.idField] != row[this.idField]
        );
        await this.$emit("update:list", datax);
      } else {
        row.state = "delete";
      }

      if (this.data.filter((x) => x.state != "delete").length == 0) {
        this.addRow(-1);
      }
    },

    getPropsData(component, value, dataField) {
      var attr = {};
      switch (component) {
        case "TheComboBox":
          attr = {
            ...this.propsData[dataField],
            initValue: value,
          };
          break;
        default:
          break;
      }
      return attr;
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
    <div
      :class="['m-table-container', { 'm-table-container-full': !showFooter }]"
      ref="MainTable"
    >
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
            <th class="m-th-action">
              <div class="th-content">
                <div class="th-title">Chức năng</div>
              </div>
            </th>
          </tr>
        </thead>
        <!-- Body -->
        <tbody>
          <tr
            v-for="(row, rowIndex) in data"
            v-show="!row.state || row.state != 'delete'"
            :key="rowIndex"
            :class="[{ 'm-tr-seleced': editingCell.row == rowIndex }, 'm-tr']"
          >
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
                v-bind="
                  getPropsData(
                    getComponent(column.type),
                    row[column.dataField],
                    column.dataField
                  )
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
            <td class="m-tr-action">
              <div class="icon-box-24" @click="addRow(rowIndex)">
                <div :class="['add', { disable: disabled }]"></div>
              </div>
              <div class="icon-box-24" @click="removeRow(rowIndex, row)">
                <div :class="['remove', { disable: disabled }]"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="m-footer-container" v-if="showFooter">
      <div class="m-footer-total">
        Tổng số: &nbsp; <strong>{{ count }}</strong> &nbsp;bản ghi
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
