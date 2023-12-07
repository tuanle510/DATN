<script>
import { ref, onMounted, getCurrentInstance, defineComponent } from "vue";
import baseDetail from "../baseDetail";
import { ContractGroupDetailData } from "./ContractGroupDetailData";
import { comboboxColumns } from "../../common/comboboxColumns";
import { comboboxLoadData } from "../../common/comboboxLoadData";

export default defineComponent({
  extends: baseDetail,
  name: "ContractGroupDetail",
  props: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const module = "ContractGroup";
    const { columns } = ContractGroupDetailData();
    const { apartmentColumns } = comboboxColumns();
    const { loadApartmentComboboxData } = comboboxLoadData();
    const selectApartment = (param) => {
      proxy.model.apartment_name = param.obj.apartment_name;
      proxy.model.owner_name = param.obj.owner_name;
      proxy.model.owner_id = param.obj.owner_id;
    };
    return {
      module,
      columns,
      apartmentColumns,
      selectApartment,
      loadApartmentComboboxData,
    };
  },
});
</script>

<template>
  <DynamicModal
    ref="ContactDetail"
    :title="`Hợp đồng ${model.contract_name || ''}`"
    class="contact-group-detail"
    position="full"
    @beforeOpen="beforeOpen($event, close)"
    @beforeClose="beforeClose($event)"
    @opened="opened"
  >
    <template #content>
      <div class="container-above">
        <!-- Trái  -->
        <div class="container-left flex1">
          <div class="grids-tab-header">
            <div class="item-tabs item-tabs-active">Bộ hồ sơ</div>
          </div>
          <div class="grids-tab-content">
            <div class="grids-tab-container">
              <div class="modal-row">
                <div class="m-label-text">Tên bộ hồ sơ</div>
                <TheTextArea
                  class="flex1"
                  disabled
                  v-model="model.contract_group_name"
                ></TheTextArea>
              </div>
            </div>
          </div>
        </div>
        <!-- Giữa  -->
        <div class="container-center flex1">
          <div class="grids-tab-header">
            <div class="item-tabs item-tabs-active">Các bên liên quan</div>
          </div>
          <div class="grids-tab-content">
            <div class="grids-tab-container">
              <div class="modal-row">
                <div class="m-label-text">Căn hộ</div>
                <TheComboBox
                  class="flex1"
                  valueField="apartment_id"
                  displayField="apartment_name"
                  :queryMode="'remote'"
                  v-model="model.apartment_id"
                  v-model:display="model.apartment_name"
                  :initValue="model.apartment_name"
                  :columns="apartmentColumns"
                  :loadComboboxData="loadApartmentComboboxData"
                  @selectItem="selectApartment"
                ></TheComboBox>
              </div>
              <div class="modal-row">
                <div class="m-label-text">Chủ nhà</div>
                <TheInput
                  disabled
                  class="flex1"
                  v-model="model.owner_name"
                ></TheInput>
              </div>
            </div>
          </div>
        </div>
        <!-- Phải  -->
        <div class="container-right flex1"></div>
      </div>

      <div class="container-under">
        <div class="grids-tab-header">
          <div class="header-left">
            <div class="item-tabs item-tabs-active">Chi tiết</div>
          </div>
          <div class="header-right">
            <TheButton class="mr-10">+ HĐ thuê chủ - khách</TheButton>
            <TheButton class="mr-10">+ HĐ thuê chủ - công ty</TheButton>
            <TheButton>+ HĐ thuê công ty - khách</TheButton>
          </div>
        </div>
        <div class="grids-tab-content">
          <div class="grids-tab-container">
            <GridViewer :data="model.Detail" :columns="columns"></GridViewer>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <TheButton class="outline-button" @click="hide()">Đóng</TheButton>
      <TheButton @click="saveAction()">Cất</TheButton>
    </template>
  </DynamicModal>
</template>
<style lang="scss">
.contact-group-detail {
  .m-modal-header {
    background-color: #f4f5f8;
  }
  .m-modal-content {
    padding: 0;
    .modal-row {
      gap: unset;
      .pl-10 {
        padding-left: 10px;
      }
    }
  }
  .container-above {
    height: 125px;
    padding: 0 16px;
    background-color: #f4f5f8;
    display: flex;
    .container-left {
      display: flex;
      flex-direction: column;
      padding-right: 8px;
      border-right: 1px solid #c1c4cc;
    }
    .container-center {
      display: flex;
      flex-direction: column;
      padding: 0 8px;
      //   border-right: 1px solid #c1c4cc;
    }
    .container-right {
      display: flex;
      flex-direction: column;
      padding-left: 8px;
    }
    .m-label-text {
      font-size: 13px;
      font-weight: 700;
      line-height: 15px;
      height: 30px;
      display: flex;
      align-items: center;
      min-width: 90px;
    }
    .input-money {
      max-width: 150px;
    }
  }
  .container-under {
    height: calc(100% - 125px);
    padding: 0 16px;
    .mb10 {
      margin-top: 10px;
    }
    .grids-tab-header {
      border: none;
      justify-content: space-between;
      .mr-10 {
        margin-right: 10px;
      }
      .header-right {
        padding: 5px 0;
      }
      .header-left {
        display: flex;
        .item-tabs-active {
          color: #026aba;
          font-weight: 600;
          text-decoration: underline;
          border: none;
        }
      }
    }
    .grids-tab-content {
      height: calc(100% - 40px);
      padding-top: unset;
      .grids-tab-container {
        height: 100%;
      }
    }
  }
}
</style>
