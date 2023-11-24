<script>
import { getCurrentInstance, ref } from "vue";
import moment from "moment";
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
    const { proxy } = getCurrentInstance();
    const checkedAll = ref(false);
    // Gen css cho table
    const genHeaderCss = (item, index) => {
      const css = {
        // maxWidth: item.width + "px",
        minWidth: item.width + "px",
        width: item.width + "px",
        textAlign: item.align,
      };
      // Nếu là cột cuối thì bỏ fix witdh đi
      if (props.columns && index == props.columns.length - 1) {
        delete css.width;
      }
      return css;
    };

    const genRowCss = (item, index) => {
      const css = {
        maxWidth: item.width + "px",
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
          value = moment(new Date(value)).format("DD/MM/YYYY");
          break;
        case "currency":
          break;
        default:
          break;
      }
      return value;
    };

    // Sự kiện dbClick row
    const onDbClick = (row) => {
      emit("onDbClick", row);
    };

    // Checkbox all
    const onClickCheckAll = () => {
      if (checkedAll.value) {
        proxy.data.forEach((item) => {
          item.checked = true;
        });
      } else {
        proxy.data.forEach((item) => {
          item.checked = false;
        });
      }
    };

    // Checkbox từng dòng
    const onClickCheck = () => {
      // Kiểm tra xem checked list có bằng list data không
      const checkedList = proxy.data.filter((x) => x.checked);

      // Nếu có thì đổi checkall thành true
      proxy.checkedAll = checkedList.length === proxy.data.length;
    };

    return {
      genHeaderCss,
      genRowCss,
      onDbClick,
      colFormat,
      onClickCheckAll,
      onClickCheck,
      checkedAll,
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
                <TheCheckbox
                  v-model="checkedAll"
                  @change="onClickCheckAll"
                ></TheCheckbox>
              </div>
            </th>
            <th
              v-for="(column, index) in columns"
              :key="index"
              :style="genHeaderCss(column, index)"
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
                <TheCheckbox
                  v-model="row.checked"
                  @change="onClickCheck()"
                ></TheCheckbox>
              </div>
            </td>
            <td
              @dblclick.prevent="onDbClick(row)"
              v-for="(column, indexC) in columns"
              :key="indexC"
              :title="row[column.dataField]"
              :style="genRowCss(column, indexC)"
            >
              <div class="text-overflow">
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
@import url(../../../css/components/GridViewer.scss);

.m-footer-total {
  position: sticky;
  left: 13px;
}
</style>
