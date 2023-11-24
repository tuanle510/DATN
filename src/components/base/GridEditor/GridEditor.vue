<script>
import { getCurrentInstance, ref } from "vue";
import moment from "moment";
export default {
  props: {
    // Danh sách cột
    columns: Array,
    // Danh sách dữ liệu
    data: Array,
  },

  methods: {
    // Gen css cho table
    genCss(item, index) {
      const css = {
        maxWidth: item.width + "px",
        minWidth: item.width + "px",
        width: item.width + "px",
        textAlign: item.align,
      };
      // Nếu là cột cuối thì bỏ fix witdh đi
      if (this.columns && index == this.columns.length - 1) {
        delete css.maxWidth;
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
      this.editingCell = {
        row: rowIndex,
        column: cellIndex,
      };
      var ref = `cell_${rowIndex}-${cellIndex}`;
      this.$nextTick(() => {
        this.$refs[ref][0].focus();
      });
    },

    endEditing() {
      this.editingCell = {
        row: null,
        column: null,
      };
    },

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
  },
  data() {
    return {
      editingCell: {},
    };
  },
};
</script>

<template>
  <div class="m-grid">
    <!-- Table -->
    <div class="m-table-container" ref="MainTable">
      <table class="m-table">
        <!-- Header -->
        <thead>
          <tr>
            <th
              v-for="(column, index) in columns"
              :key="index"
              :style="genCss(column, index)"
            >
              <div class="th-content">
                <div class="th-title">
                  {{ column.name }}
                </div>
                <div class="th-resize"></div>
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
              :style="genCss(column, cellIndex)"
              @click.prevent="startEditing(rowIndex, cellIndex)"
              @keydown.tab.prevent="onTab(rowIndex, cellIndex)"
              v-on:clickout="endEditing()"
            >
              <component
                :ref="`cell_${rowIndex}-${cellIndex}`"
                v-show="
                  editingCell.row === rowIndex &&
                  editingCell.column === cellIndex
                "
                :is="getComponent(column.type)"
                v-model="row[column.dataField]"
              ></component>
              <div
                v-show="
                  !(
                    editingCell.row === rowIndex &&
                    editingCell.column === cellIndex
                  )
                "
                class="text-overflow editor-click"
              >
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
        Tổng số: &nbsp; <strong>200</strong> &nbsp;bản ghi
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url(../../../css/components/GridEditor.scss);

.m-footer-total {
  position: sticky;
  left: 13px;
}
.editor-click {
  padding: 0 10px;
}
</style>
