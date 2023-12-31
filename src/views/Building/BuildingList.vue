<script>
import { defineComponent, getCurrentInstance, ref } from "vue";
import baseList from "@/views/baseList";
import popupUtil from "@/components/base/DynamicModal/popupUtil";

export default defineComponent({
  extends: baseList,
  props: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const columns = ref([
      {
        width: 150,
        name: "Tên tòa nhà",
        dataField: "building_name",
        align: "left",
      },
      {
        // width: 150,
        name: "Địa chỉ",
        dataField: "building_address",
        align: "left",
      },
    ]);
    const formDetailName = "BuildingDetail";
    const module = "Building";
    const primaryKey = "building_id";
    const nameKey = "building_name";
    const headerText = "Tòa nhà";

    function onClickAcitonCustom(row, action) {
      let param = {
        data: row,
        mode: proxy.$constants.formMode.Add,
        isFromBuilding: true,
      };
      switch (action) {
        case "InsertDetail":
          popupUtil.show("ApartmentDetail", param);
          break;
      }
    }
    return {
      columns,
      formDetailName,
      module,
      primaryKey,
      nameKey,
      headerText,
      onClickAcitonCustom,
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
          idField="building_id"
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
                <TheMenuItem @click="onClickAciton(row, 'InsertDetail')"
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
