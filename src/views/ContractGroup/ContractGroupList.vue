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
        name: "Tên bộ hồ sơ",
        dataField: "contract_group_name",
        align: "left",
      },
      {
        width: 250,
        name: "Căn hộ",
        dataField: "apartment_name",
        align: "left",
      },
      {
        width: 250,
        name: "Chủ nhà",
        dataField: "owner_name",
        align: "left",
      },
    ]);
    const formDetailName = "ContractGroupDetail";
    const module = "ContractGroup";
    const primaryKey = "contract_group_id";
    const nameKey = "contract_group_name";
    const headerText = "Bộ hồ sơ";
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
  <div class="m-view">
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
          @onDbClick="view"
          @onPaginate="onPaginate"
          :loading="tableLoading"
          :total="total"
        >
          <template #action="{ row }">
            <span class="action-link" @click="onClickAciton(row, 'View')"
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
