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
        width: 150,
        name: "Tên khách hàng",
        dataField: "client_name",
        align: "left",
      },
      {
        width: 150,
        name: "Công ty",
        dataField: "company_name",
        align: "left",
      },
      {
        width: 100,
        name: "Điện thoại",
        dataField: "phone_number",
        align: "left",
      },
      {
        width: 150,
        name: "Email",
        dataField: "email",
        align: "left",
      },
      {
        width: 100,
        name: "Ngày sinh",
        dataField: "birthdate",
        align: "center",
        type: "date",
      },
      {
        name: "Ghi chú",
        dataField: "note",
        align: "left",
      },
    ]);
    const formDetailName = "ClientDetail";
    const module = "Client";
    const primaryKey = "client_id";
    return {
      columns,
      formDetailName,
      module,
      primaryKey,
    };
  },
});
</script>

<template>
  <div class="chu-nha-view m-view">
    <!-- Phần tiêu đề-->
    <div class="m-header">
      <span class="m-header-title">Danh sách khách hàng</span>
      <TheButton @click="add()">Thêm </TheButton>
    </div>
    <!-- Phần nội dung -->
    <div class="m-container">
      <div class="m-container-toolbar">
        <div class="toolbar-field">
          <TheInput placeholder="Tìm kiếm căn hộ" />
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
          :isPaging="true"
          :columns="columns"
          :data="data"
          @onDbClick="edit"
          @onPaginate="onPaginate"
          :loading="tableLoading"
          :total="total"
        >
        </GridViewer>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url(../../css/baseList.scss);
</style>
