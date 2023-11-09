<script>
import { defineComponent, getCurrentInstance, ref } from "vue";
import baseList from "../baseList";
export default defineComponent({
  extends: baseList,
  props: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const columns = ref([
      {
        width: 100,
        name: "Tên chủ nhà",
        dataField: "name",
        align: "left",
      },
      {
        width: 80,
        name: "Ngày sinh",
        dataField: "birthdate",
        align: "center",
        format: "date",
      },
      {
        width: 100,
        name: "Điện thoại",
        dataField: "phone_number",
        align: "right",
      },
      {
        width: 150,
        name: "Email",
        dataField: "email",
        align: "left",
      },
      {
        width: 200,
        name: "Địa chỉ",
        dataField: "location",
        align: "left",
      },
      {
        width: 150,
        name: "Ghi chú",
        dataField: "location",
        align: "left",
      },
    ]);
    const formDetailName = "ThemChuNha";
    return {
      columns,
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
          <TheInput placeholder="Tìm kiếm chủ nhà" />
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
          :data="data"
          @onDbClick="onDbClick"
          :loading="tableLoading"
        >
        </GridViewer>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url(../../css/baseList.scss);
</style>
