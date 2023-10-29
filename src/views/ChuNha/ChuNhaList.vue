<script>
import { defineComponent, getCurrentInstance, ref } from 'vue';
import baseList from '../baseList';
export default defineComponent({
  extends: baseList,
  props: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const columns = ref([
      {
        width: 150,
        name: 'Tên chủ nhà',
        dataField: 'ten_chu_nha',
      },
      {
        width: 150,
        name: 'Ngày sinh',
        dataField: 'ngay_sinh',
      },
      {
        width: 70,
        name: 'Điện thoại',
        dataField: 'so_dien_thoai',
      },
      {
        width: 150,
        name: 'Email',
        dataField: 'email',
      },
      {
        width: 200,
        name: 'Địa chỉ',
        dataField: 'dia_chi',
      },
      {
        width: 150,
        name: 'Ghi chú',
        dataField: 'ghi_chu',
      },
    ]);
    const datas = ref([
      {
        ten_chu_nha: 'Trần Thị Thu Hà',
      },
      {
        ten_chu_nha: 'Lê Thiện Tuấn',
      },
      {
        ten_chu_nha: 'Trần Thị Thu Hà',
      },
      {
        ten_chu_nha: 'Lê Thiện Tuấn',
      },
      {
        ten_chu_nha: 'Trần Thị Thu Hà',
      },
      {
        ten_chu_nha: 'Lê Thiện Tuấn',
      },
      {
        ten_chu_nha: 'Trần Thị Thu Hà',
      },
      {
        ten_chu_nha: 'Lê Thiện Tuấn',
      },
      {
        ten_chu_nha: 'Trần Thị Thu Hà',
      },
      {
        ten_chu_nha: 'Lê Thiện Tuấn',
      },
      {
        ten_chu_nha: 'Trần Thị Thu Hà',
      },
      {
        ten_chu_nha: 'Lê Thiện Tuấn',
      },
      {
        ten_chu_nha: 'Trần Thị Thu Hà',
      },
      {
        ten_chu_nha: 'Lê Thiện Tuấn',
      },
      {
        ten_chu_nha: 'Trần Thị Thu Hà 1111111',
      },
    ]);
    const formDetailName = 'ThemChuNha';
    return {
      columns,
      datas,
      formDetailName,
    };
  },
});
</script>

<template>
  <div class="chu-nha-view m-view">
    <!-- Phần tiêu đề-->
    <div class="m-header">
      <span class="m-header-title">Danh sách chủ nhà</span>
      <TheButton @click="add()">Thêm </TheButton>
    </div>
    <!-- Phần nội dung -->
    <div class="m-container">
      <div class="m-container-toolbar">
        <div class="toolbar-field">
          <TheInput placeholder="Tìm kiếm tài sản" />
        </div>
        <div class="toolbar-right">
          <div class="toolbar-btn">
            <div class="refresh"></div>
          </div>
          <div class="toolbar-btn">
            <div class="excel"></div>
          </div>
          <div class="toolbar-btn">
            <div class="remove"></div>
          </div>
        </div>
      </div>
      <div class="m-container-content">
        <GridViewer
          :isMulti="true"
          :columns="columns"
          :datas="datas"
          @onDbClick="onDbClick"
        >
        </GridViewer>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url(../../css/baseList.scss);
</style>
