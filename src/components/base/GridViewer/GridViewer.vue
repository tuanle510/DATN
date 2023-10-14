<script>
import { onMounted, ref } from 'vue';
export default {
  //   props: {
  //     // Danh sách cột
  //     columns,
  //     // Danh sách dữ liệu
  //     datas,
  //     // Có tích chọn nhiều không
  //     isMulti: {
  //       default: false,
  //       type: Boolean,
  //     },
  //     // Có phân trang hay không
  //     isPaging: {
  //       default: false,
  //       type: Boolean,
  //     },
  //   },
  setup() {
    const defaultColumns = ref([
      {
        width: 100,
        name: 'Tên chủ nhà',
        dataField: 'ten_chu_nha',
      },
      {
        width: 200,
        name: 'Điện thoại',
        dataField: 'so_dien_thoai',
      },
      {
        width: 150,
        name: 'Email',
        dataField: 'email',
      },
      {
        width: 150,
        name: 'CMT',
        dataField: 'chung_minh_thu',
      },
      {
        width: 150,
        name: 'CCCD',
        dataField: 'can_cuoc',
      },
      {
        width: 150,
        name: 'Ngày sinh',
        dataField: 'ngay_sinh',
      },
      {
        width: 150,
        name: 'Địa chỉ',
        dataField: 'dia_chi',
      },
      {
        width: 150,
        name: 'Thu nhập',
        dataField: 'thu_nhap',
        sum: true,
      },
    ]);

    const defaultDatas = ref([
      {
        ten_chu_nha: 'tuan.lt',
        so_dien_thoai: '0969095510',
        email: 'tuanle510',
        chung_minh_thu: '0123456789',
        can_cuoc: '012300056789',
        ngay_sinh: '05/10/2000',
        dia_chi: 'Ha Noi',
        thu_nhap: 100,
      },
    ]);

    return {
      defaultColumns,
      defaultDatas,
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
            <th
              v-for="(column, index) in defaultColumns"
              :key="index"
              :style="{ width: column.width + 'px' }"
            >
              {{ column.name }}
            </th>
          </tr>
        </thead>
        <!-- Body -->
        <tbody>
          <tr
            @dblclick="showEditDialog(item)"
            @click="onRowClick(item, $event)"
            v-for="(item, index) in defaultDatas"
            :key="index"
            :class="[{ 'm-tr-seleced': item.checked }, 'm-tr']"
          >
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
    </div>

    <!-- paging -->
    <!-- v-if="isPaging"  -->
    <div
      class="m-footer-container"
      ref="FooterTable"
      @scroll="
        this.$refs.MainTable.scrollLeft = this.$refs.FooterTable.scrollLeft
      "
    >
      <table class="m-table-footer">
        <tbody>
          <tr>
            <td
              v-for="(column, index) in defaultColumns"
              :key="index"
              :style="{ width: column.width + 'px' }"
            >
              {{ column.name }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style></style>
