<script>
import { defineComponent, getCurrentInstance, ref } from "vue";
import baseList from "@/views/baseList";
import commonFn from "@/common/commonFn";
import popupUtil from "@/components/base/DynamicModal/popupUtil";

export default defineComponent({
  extends: baseList,
  props: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const columns = [
      {
        width: 150,
        name: "Bộ hồ sơ",
        dataField: "contract_group_name",
      },
      {
        width: 120,
        name: "Tên căn hộ",
        dataField: "apartment_name",
      },
      {
        width: 150,
        name: "Bên cho thuê",
        dataField: "lessor_name",
      },
      {
        width: 150,
        name: "Bên thuê/Môi giới",
        dataField: "renter_name",
      },
      {
        width: 100,
        name: "Ngày bắt đầu",
        dataField: "start_date",
        align: "center",
        type: "date",
      },
      {
        width: 100,
        name: "Ngày kết thúc",
        dataField: "end_date",
        align: "center",
        type: "date",
      },
      {
        width: 120,
        name: "Trạng thái",
        dataField: "status",
      },
      {
        name: "Kiểu hợp đồng",
        dataField: "contract_type",
      },
    ];
    /**
     * Xử lí columns
     * @param {*} payload
     */
    const processColumns = (payload) => {
      // Các cột config trong bảng
      var columns = proxy.columns.map((x) => x.dataField);
      if (proxy.primaryKey && !columns.includes(proxy.primaryKey)) {
        columns.push(proxy.primaryKey);
      }
      payload.columns = columns.join(",");
      payload.columns = payload.columns.replace(
        "lessor_name,renter_name",
        "owner_name,company_name,client_name"
      );
    };

    const bindData = (data) => {
      data = data.forEach((element) => {
        switch (element.contract_type) {
          case proxy.$constants.contractType.CK:
            element.lessor_name = element.owner_name;
            element.renter_name = element.client_name;
            break;
          case proxy.$constants.contractType.CCT:
            element.lessor_name = element.owner_name;
            element.renter_name = element.company_name;
            break;
          case proxy.$constants.contractType.CTK:
            element.lessor_name = element.company_name;
            element.renter_name = element.client_name;
            break;
        }
      });
    };

    // Hiển thị form chi tiết hợp đồng
    const editDetail = (row) => {
      commonFn.mask();
      const param = {
        mode: proxy.$constants.formMode.View,
        id: row.contract_id,
        reloadDetail: proxy.reload,
      };
      switch (row.contract_type) {
        case proxy.$constants.contractType.CK:
          popupUtil.show("ContractDetail", param);
          break;
        case proxy.$constants.contractType.CTK:
          popupUtil.show("ContractDetailCtyKhach", param);
          break;
        case proxy.$constants.contractType.CCT:
          popupUtil.show("ContractDetailCtyChu", param);
          break;
      }
    };

    /**
     * Mở form view (chỉ xem)
     * @param {*} row
     */
    const view = (row) => {
      proxy.editDetail(row);
    };

    /**
     * Mở form thêm mới
     */
    const add = () => {
      const param = {
        mode: proxy.$constants.formMode.Add,
        isContract: true,
      };
      proxy.showDetailForm(param);
    };

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
      processColumns,
      bindData,
      editDetail,
      view,
      add,
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
          @onDbClick="editDetail"
          @onPaginate="onPaginate"
          :isFilterHeader="true"
          @filterHeader="filterHeader"
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
