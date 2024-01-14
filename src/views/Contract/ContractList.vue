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
        name: "Tên khách hàng",
        dataField: "client_name",
        align: "left",
      },
      // {
      //   width: 150,
      //   name: "Công ty",
      //   dataField: "company_name",
      //   align: "left",
      // },
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
        align: "left",
      },
      {
        name: "Ghi chú",
        dataField: "note",
        align: "left",
      },
    ]);
    const formDetailName = "ContractDetail";
    const module = "Contract";
    const primaryKey = "contract_id";
    const nameKey = "contract_name";
    const headerText = "Hợp đồng";
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
          <!-- <TheInput placeholder="Tìm kiếm căn hộ" /> -->
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
@import url(@/css/baseList.scss);
</style>
