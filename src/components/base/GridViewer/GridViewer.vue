<script>
import { getCurrentInstance, ref } from "vue";
import moment from "moment";
import commonFn from "../../../common/commonFn";
import ThePaginate from "../Paginate/ThePaginate.vue";
export default {
  components: { ThePaginate },
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
    // Tổng sô bản ghi
    total: {
      default: null,
      type: Number,
    },
  },
  watch: {
    columns(newValue) {
      this.initColumns(newValue);
    },
  },
  created() {
    const me = this;
    me.initColumns();
  },

  methods: {
    initColumns(columns = this.columns) {
      const me = this;
      if (columns) {
        me.columnx = [];
        me.$nextTick(() => {
          columns.forEach((x) => {
            me.columnx.push(x);
          });
        });
      }
    },

    // sự kiện thay đổi phân trang
    onPaginate(payload) {
      this.$emit("onPaginate", payload);
    },

    onClickAciton(row) {
      this.$emit("onClickAciton", row);
    },

    // Sự kiện dbClick row
    onDbClick(row) {
      this.$emit("onDbClick", row);
    },

    // Checkbox all
    onClickCheckAll() {
      if (checkedAll.value) {
        proxy.data.forEach((item) => {
          item.checked = true;
        });
      } else {
        proxy.data.forEach((item) => {
          item.checked = false;
        });
      }
    },

    // Checkbox từng dòng
    onClickCheck() {
      // Kiểm tra xem checked list có bằng list data không
      const checkedList = proxy.data.filter((x) => x.checked);
      // Nếu có thì đổi checkall thành true
      proxy.checkedAll = checkedList.length === proxy.data.length;
    },

    // Gen css cho header table
    genHeaderCss(item, index) {
      const css = {
        minWidth: item.width + "px",
        width: item.width + "px",
        textAlign: item.align || "left",
      };
      let colIndex = this.columnx.findIndex((x) => x.autoRezie == true);
      if (colIndex) {
        if (colIndex == index) {
          delete css.width;
        }
      } else {
        // Nếu là cột cuối thì bỏ fix witdh đi
        if (this.columnx && index == this.columnx.length - 1) {
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
      let autoResizeCol = this.columnx.filter((x) => x.autoRezie == true);
      if (autoResizeCol) {
        if (autoResizeCol.dataField == item.dataField) {
          delete css.maxWidth;
        }
      } else {
        // Nếu là cột cuối thì bỏ fix witdh đi
        if (this.columnx && index == this.columnx.length - 1) {
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
  },
  data() {
    return {
      checkedAll: false,
      columnx: [],
    };
  },

  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();

    return {};
  },
};
</script>

<template>
  <div class="m-grid">
    <!-- Table -->
    <div
      :class="['m-table-container', { 'm-table-container-full': !isPaging }]"
      ref="MainTable"
    >
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
              v-for="(column, index) in columnx"
              :key="index"
              :style="genHeaderCss(column, index)"
            >
              <div class="th-content">
                <span class="th-title">
                  {{ column.name }}
                </span>
              </div>
            </th>
            <th class="m-th-action" v-if="isMulti">
              <div class="th-content">
                <div class="th-title">Chức năng</div>
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
              v-for="(column, indexC) in columnx"
              :key="indexC"
              :title="colFormat(row[column.dataField], column.type)"
              :style="genRowCss(column, indexC)"
            >
              <div class="text-overflow">
                <span class="td-normal-span">{{
                  colFormat(row[column.dataField], column.type)
                }}</span>
              </div>
            </td>
            <td class="m-tr-action d-flex-center" v-if="isMulti">
              <slot name="action" :row="row"></slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="m-footer-container" v-if="isPaging">
      <div class="m-footer-total">
        Tổng số: &nbsp;<strong>{{ total }}</strong> &nbsp;bản ghi
      </div>
      <div class="m-footer-paginate">
        <ThePaginate @clickHandler="onPaginate" :total="total"></ThePaginate>
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
