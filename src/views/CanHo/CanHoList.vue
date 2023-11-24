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
        name: "Tên căn hộ",
        dataField: "apartment_name",
        align: "left",
      },
      {
        width: 150,
        name: "Tòa nhà",
        dataField: "building_name",
        align: "left",
      },
      {
        width: 150,
        name: "Địa chỉ",
        dataField: "address",
        align: "left",
      },
      {
        width: 150,
        name: "Mô tả",
        dataField: "description",
        align: "left",
      },
    ]);
    const formDetailName = "CanHoDetail";
    const module = "CanHo";
    const primaryKey = "apartment_id";
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
      <span class="m-header-title">Danh sách căn hộ</span>
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
          :columns="columns"
          :data="data"
          @onDbClick="edit"
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
