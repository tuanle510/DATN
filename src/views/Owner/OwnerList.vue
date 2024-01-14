<script>
import { defineComponent, getCurrentInstance, ref } from "vue";
import baseList from "@/views/baseList";

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
        width: 120,
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
        name: "Ghi chú",
        dataField: "note",
        align: "left",
      },
    ]);
    const formDetailName = "OwnerDetail";
    const module = "Owner";
    const primaryKey = "owner_id";
    const nameKey = "owner_name";
    const headerText = "Chủ nhà";
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
          <!-- <TheInput placeholder="Tìm kiếm chủ nhà" /> -->
        </div>
        <div class="toolbar-right">
          <div
            class="toolbar-btn"
            @click="reload"
            v-tooltip="'Lấy lại dữ liệu'"
          >
            <div class="refresh"></div>
          </div>
          <!-- <div class="toolbar-btn">
            <div class="excel"></div>
          </div> -->
          <div class="toolbar-btn" @click="deleteMulti" v-tooltip="'Xóa nhiều'">
            <div class="remove"></div>
          </div>
        </div>
      </div>
      <div class="m-container-content">
        <GridViewer
          v-model:selected="selected"
          idField="owner_id"
          :isMulti="true"
          :isPaging="true"
          :columns="columns"
          :data="data"
          @onDbClick="edit"
          @onPaginate="onPaginate"
          @filterHeader="filterHeader"
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
                <TheMenuItem @click="onClickAciton(row)"
                  >Thêm căn hộ</TheMenuItem
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
@import url(@/css/baseList.scss);
</style>
