<script>
import { onMounted, ref } from "vue";
export default {
  props: {
    // Danh sách cột
    columns: Array,
    // Danh sách dữ liệu
    data: Array,
    // Có tích chọn nhiều không
    isMulti: {
      default: false,
      type: Boolean,
    },
    // Có phân trang hay không
    isPaging: {
      default: false,
      type: Boolean,
    },
    // Trạng thái loading
    loading: {
      default: false,
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const isCheckAll = ref(false);
    // Gen css cho table
    const genCss = (item, index) => {
      const css = {
        maxWidth: item.width + "px",
        minWidth: item.width + "px",
        width: item.width + "px",
        textAlign: item.align,
      };
      // Nếu là cột cuối thì bỏ fix witdh đi
      if (props.columns && index == props.columns.length - 1) {
        delete css.maxWidth;
      }
      return css;
    };

    // Format theo kiểu dữ liệu
    const colFormat = (value, type) => {
      switch (type) {
        case "date":
          break;
        case "currency":
          break;
        default:
          break;
      }
      return value;
    };

    //
    const onDbClick = (row) => {
      emit("onDbClick", row);
    };
    return {
      genCss,
      isCheckAll,
      onDbClick,
      colFormat,
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
            <th class="m-th-checkbox" v-if="isMulti">
              <div class="d-flex-center">
                <TheCheckbox v-model="isCheckAll"></TheCheckbox>
              </div>
            </th>
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
        <!-- Loading -->
        <div v-if="loading" class="m-table-loading">
          <div class="m-table-loading-icon"></div>
        </div>
        <!-- Body -->
        <tbody v-else>
          <tr
            v-for="(row, index) in data"
            :key="index"
            :class="[{ 'm-tr-seleced': row.checked }, 'm-tr']"
          >
            <td class="m-tr-checkbox" v-if="isMulti">
              <div class="d-flex-center">
                <TheCheckbox></TheCheckbox>
              </div>
            </td>
            <td
              @dblclick.prevent="onDbClick(row)"
              v-for="(column, indexC) in columns"
              :key="indexC"
              :title="row[column.dataField]"
              :style="genCss(column, indexC)"
            >
              <div class="text-overflow">
                <span class="td-normal-span">{{
                  colFormat(row[column.dataField])
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
@import url(../../../css/components/GridViewer.scss);

.m-footer-total {
  position: sticky;
  left: 13px;
}
</style>
