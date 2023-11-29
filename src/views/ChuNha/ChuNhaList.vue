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
        name: "Tên chủ nhà",
        dataField: "owner_name",
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
        width: 100,
        name: "Điện thoại",
        dataField: "phone_number",
        align: "left",
      },
      {
        width: 200,
        name: "Email",
        dataField: "email",
        align: "left",
      },
      {
        width: 250,
        name: "Địa chỉ",
        dataField: "address",
        align: "left",
      },
      {
        width: 150,
        name: "Ghi chú",
        dataField: "note",
        align: "left",
      },
    ]);
    const formDetailName = "ChuNhaDetail";
    const module = "ChuNha";
    const primaryKey = "owner_id";
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
          @onDbClick="edit"
          @onPaginate="onPaginate"
          @onClickAciton="onClickAciton"
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
