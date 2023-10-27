<script>
import { onMounted, ref } from "vue";
export default {
  props: {
    // Danh sách cột
    columns: Array,
    // Danh sách dữ liệu
    datas: Array,
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
  },
  setup(props) {
    const isCheckAll = ref(false);
    // Gen css cho table
    const genWidth = (item, index) => {
      // Nếu là cột cuối thì bỏ fix witdh đi
      if (props.columns && index == props.columns.length - 1) {
        return {
          minWidth: item.width + "px",
        };
      }
      return {
        width: item.width + "px",
        minWidth: item.width + "px",
      };
    };

    return {
      genWidth,
      isCheckAll,
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
              :style="genWidth(column, index)"
            >
              {{ column.name }}
            </th>
          </tr>
        </thead>
        <!-- Body -->
        <tbody>
          <tr
            v-for="(item, index) in datas"
            :key="index"
            :class="[{ 'm-tr-seleced': item.checked }, 'm-tr']"
          >
            <td class="m-tr-checkbox" v-if="isMulti">
              <div class="d-flex-center">
                <TheCheckbox></TheCheckbox>
              </div>
            </td>
            <!-- @dblclick="showEditDialog(item)"
              @click="onRowClick(item, $event)" -->
            <td
              v-for="(column, indexC) in columns"
              :key="indexC"
              :style="genWidth(column, indexC)"
            >
              {{ item[column.dataField] }}
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
>
