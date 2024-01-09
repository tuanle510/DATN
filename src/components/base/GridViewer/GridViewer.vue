<script>
import { getCurrentInstance, ref } from "vue";
import moment from "moment";
import commonFn from "@/common/commonFn";
import ThePaginate from "../Paginate/ThePaginate.vue";
export default {
  components: { ThePaginate },
  emits: ["update:selected", "onPaginate", "onClickAciton", "onDbClick"],
  props: {
    // Danh sách cột
    columns: Array,
    // Danh sách dữ liệu
    data: Array,
    // id để v-model:seleced
    idField: String,
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
    // Value thực hiện lưu giá trị các cột được chọn
    selected: {
      type: Array,
      return: () => [],
    },
  },
  watch: {
    columns(newValue) {
      this.initColumns(newValue);
    },
    selected(newVal, oldVal) {
      if (newVal) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.checkedAll = this.isCheckedMultiple(newVal);
          }, 0);
        });
      }
    },
    data(newVal, olVal) {
      if (newVal) {
        const me = this;
        // check selected các bản ghi khi mà load lại trang hoặc search làm thay đổi data grid
        if (Array.isArray(me.selected) && me.selected.length > 0) {
          me.checkedAll = me.isCheckedMultiple(me.selected);
        }
      }
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
    async onPaginate(payload) {
      await this.$emit("onPaginate", payload);
    },

    onClickAciton(row) {
      this.$emit("onClickAciton", row);
    },

    // Sự kiện dbClick row
    onDbClick(row) {
      this.$emit("onDbClick", row);
    },

    /**
     * Kiểm tra xem tất cả dữ liệu có đang được check hay không
     * created by LTDAT 25.06.2020
     * modify by nnlam 05/05/2021
     */
    isCheckedMultiple(selected) {
      const me = this;
      if (selected) {
        //Nếu ko có paging và filter thì check luôn length để kiểm tra selected hết
        if (!me.isPaging) return selected.length === me.data.length;
        if (me.data && me.data.length != 0) {
          return (
            selected.length >= me.data.length &&
            me.data.every((item, index) => {
              return selected.findIndex(
                (dataRow) => dataRow[me.idField] === item[me.idField]
              ) === -1
                ? false
                : true;
            })
          );
        } else {
          return false;
        }
      }
    },

    // Checkbox từng dòng
    clickMultiple($e, dataRow) {
      const me = this;
      const checked = $e.target.checked;
      let VModel = me.selected ? [...me.selected] : [];
      const index = VModel.findIndex(
        (x) => x[me.idField] === dataRow[me.idField]
      );
      if (!checked) {
        VModel = VModel.filter((x) => x[me.idField] !== dataRow[me.idField]);
      } else {
        if (index === -1) {
          VModel.push(dataRow);
        }
      }

      me.$emit("update:selected", VModel);
    },

    changeCheckedMultiple(e) {
      const me = this;
      const checked =
        e.target.tagName.toLowerCase() === "input" ? e.target.checked : false;

      let VModel = [...me.selected];
      if (!checked) {
        me.data.forEach((dataRow) => {
          const existed = VModel.find(
            (x) => x[me.idField] === dataRow[me.idField]
          );
          if (existed) {
            VModel = VModel.filter((x) => x[me.idField] != existed[me.idField]);
          }
        });
      } else {
        me.data.forEach((dataRow) => {
          const existed = VModel.find(
            (x) => x[me.idField] === dataRow[me.idField]
          );

          if (!VModel.includes(existed)) {
            VModel.push(dataRow);
          }
        });
      }
      me.$emit("update:selected", VModel);
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

    // Trạng thái chọn của từng dòng
    isSelected(dataRow) {
      const me = this;
      if (me.selected && me.selected.length > 0) {
        return this.selected.findIndex(
          (x) => x[me.idField] === dataRow[me.idField]
        ) === -1
          ? false
          : true;
      }
      return false;
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
                  @change="changeCheckedMultiple"
                ></TheCheckbox>
              </div>
            </th>
            <th
              v-for="(column, index) in columnx"
              :key="index"
              :style="genHeaderCss(column, index)"
            >
              <div class="th-content">
                <div class="th-title">
                  {{ column.name }}
                </div>
              </div>
              <!-- Lọc -->
              <div class="th-filter">
                <div class="th-filter-icon">
                  <div
                    :class="[column.type == 'date' ? 'op-equal' : 'op-contain']"
                  ></div>
                </div>
                <TheDatepicker
                  v-if="column.type == 'date'"
                  class="th-filter-input"
                  v-model="column.filterValue"
                >
                </TheDatepicker>
                <TheInput
                  v-else
                  class="th-filter-input"
                  v-model="column.filterValue"
                ></TheInput>
              </div>
              <!-- Hết lọc -->
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
                  :checked="isSelected(row)"
                  @change="clickMultiple($event, row)"
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
@import url(@/css/components/GridViewer.scss);

.m-footer-total {
  position: sticky;
  left: 13px;
}
</style>
