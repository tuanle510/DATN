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
    const nameKey = "client_name";
    const headerText = "Khách thuê";
    return {
      columns,
      formDetailName,
      module,
      primaryKey,
      nameKey,
      headerText,
    };
  },
});
</script>

<template>
  <div class="chu-nha-view m-view">
    <!-- Phần tiêu đề-->
    <div class="m-header">
      <span class="m-header-title">Danh sách {{ headerText }}</span>
      <TheButton @click="add()">Thêm </TheButton>
    </div>
    <!-- Phần nội dung -->
    <div class="m-container">
      <div class="m-container-toolbar">
        <div class="toolbar-field">
          <TheInput placeholder="Tìm kiếm căn hộ" />
        </div>
        <div class="toolbar-right">
          <div class="toolbar-btn" @click="reload">
            <div class="refresh"></div>
          </div>
          <!-- <div class="toolbar-btn">
            <div class="excel"></div>
          </div> -->
          <div class="toolbar-btn" @click="deleteMulti">
            <div class="remove"></div>
          </div>
        </div>
      </div>
      <div class="m-container-content">
        <GridViewer
          v-model:selected="selected"
          idField="client_id"
          :isMulti="true"
          :isPaging="true"
          :columns="columns"
          :data="data"
          @onDbClick="edit"
          @onPaginate="onPaginate"
          :loading="tableLoading"
          :total="total"
        >
          <template #action="{ row }">
            <span class="action-link" @click="onClickAciton(row, 'Edit')"
              >Xem/Sửa</span
            >
            <TheMenuWrapper>
              <template #toggle-button="{ toggle }">
                <div class="icon-box-24" @click="toggle">
                  <div class="dropdown"></div>
                </div>
              </template>
              <template #default>
                <TheMenuItem @click="onClickAciton(row, 'Delete')"
                  >Xóa</TheMenuItem
                >
              </template>
            </TheMenuWrapper>
          </template>
        </GridViewer>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url(../../css/baseList.scss);
</style>
