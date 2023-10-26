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
    const defaultColumns = ref([
      {
        width: 100,
        name: "Tên chủ nhà",
        dataField: "ten_chu_nha",
      },
      {
        width: 200,
        name: "Điện thoại",
        dataField: "so_dien_thoai",
      },
      {
        width: 150,
        name: "Email",
        dataField: "email",
      },
      {
        width: 150,
        name: "CMT",
        dataField: "chung_minh_thu",
      },
      {
        width: 150,
        name: "CCCD",
        dataField: "can_cuoc",
      },
      {
        width: 150,
        name: "Ngày sinh",
        dataField: "ngay_sinh",
      },
      {
        width: 150,
        name: "Địa chỉ",
        dataField: "dia_chi",
      },
      {
        width: 150,
        name: "Thu nhập",
        dataField: "thu_nhap",
        sum: true,
      },
    ]);

    const defaultDatas = ref([
      {
        ten_chu_nha: "tuan.lt",
        so_dien_thoai: "0969095510",
        email: "tuanle510",
        chung_minh_thu: "0123456789",
        can_cuoc: "012300056789",
        ngay_sinh: "05/10/2000",
        dia_chi: "Ha Noi",
        thu_nhap: 100,
      },
    ]);

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
      defaultColumns,
      defaultDatas,
      genWidth,
      isCheckAll,
    };
  },
};
</script>

<template>
  <div class="m-grid">
    <!-- Table -->
    <div
      class="m-table-container"
      ref="MainTable"
      @scroll="
        this.$refs.FooterTable.scrollLeft = this.$refs.MainTable.scrollLeft
      "
    >
      <table class="m-table">
        <!-- Header -->
        <thead>
          <tr>
            <th class="m-th-checkbox">
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
            <td class="m-tr-checkbox">
              <div class="d-flex-center">
                <TheCheckbox></TheCheckbox>
              </div>
            </td>
            <!-- @dblclick="showEditDialog(item)"
              @click="onRowClick(item, $event)" -->
            <td
              v-for="(column, indexC) in defaultColumns"
              :key="indexC"
              :style="{
                width: column.width + 'px',
                minWidth: column.width + 'px',
              }"
            >
              {{ item[column.dataField] }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="m-footer-container">
        Tổng số: &nbsp; <strong>200</strong> &nbsp;bản ghi
      </div>
    </div>
  </div>
</template>
<style></style>
