<script>
import { ref, onMounted, getCurrentInstance, defineComponent } from "vue";
import baseDetail from "@/views/baseDetail";
import { ContractGroupDetailData } from "./ContractGroupDetailData";
import { comboboxColumns } from "@/common/comboboxColumns";
import { comboboxLoadData } from "@/common/comboboxLoadData";
import popupUtil from "@/components/base/DynamicModal/popupUtil";
import { confirmYes, confirm } from "@/common/dialogFn";
import commonFn from "@/common/commonFn";

export default defineComponent({
  extends: baseDetail,
  name: "ContractGroupDetail",
  props: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const module = "ContractGroup";
    const isDetailMaster = true;
    const { columns } = ContractGroupDetailData();
    const { apartmentColumns } = comboboxColumns();
    const { loadApartmentData } = comboboxLoadData();
    // Ấn từ các button thêm hợp đồng
    const isAddContract = ref(false);
    // Loại hợp đồng
    const contractType = ref(0);
    /**
     * Gán thông tin chủ nhà
     * @param {*} param
     */
    const selectApartment = (param) => {
      proxy.model.owner_name = param.obj.owner_name;
      proxy.model.owner_id = param.obj.owner_id;
    };
    /**
     * Thêm hợp đồng chi tiết
     * @param {*} value
     */
    const addContract = (value) => {
      if (
        proxy.mode == proxy.$constants.formMode.Add ||
        (proxy.mode == proxy.$constants.formMode.Edit &&
          commonFn.checkDiff(proxy.model, proxy.oldData))
      ) {
        confirmYes(
          "Thông báo",
          "Thông tin Bộ hồ sơ đã thay đổi. Chương trình sẽ lưu lại trước khi tại mới các hợp đồng liên quan"
        ).then((answer) => {
          if (answer) {
            proxy.beforeShowContractForm(value);
          }
        });
      } else {
        proxy.beforeShowContractForm(value);
      }
    };

    /**
     * Trước khi show thì thêm mói/sủa master
     * @param {*} value
     */
    const beforeShowContractForm = (value) => {
      isAddContract.value = true;
      contractType.value = value;
      // Nếu là form thêm mới thì cất trc khi thêm
      if (
        proxy.mode == proxy.$constants.formMode.Add ||
        (proxy.mode == proxy.$constants.formMode.Edit &&
          commonFn.checkDiff(proxy.model, proxy.oldData))
      ) {
        // Cất/sửa master trước khi mở form thêm hợp đồng
        proxy.saveAction();
      } else {
        // Nếu là form view thì mở form luôn
        proxy.showContractForm();
      }
    };

    // Overide hàm validate trc khi save
    const validateBeforeSave = () => {
      const me = proxy;
      // validate control
      if (!me.validateComponents()) {
        // Hiển thị Alert
        let title = "Cất không thành công";
        let message = me.buildMes();
        confirmYes(title, message).then((answer) => {
          if (answer) {
            // Tắt alert thì focus sau
            me.$nextTick(() => {
              me.focusFirstError();
            });
          }
        });
        return false;
      }
      return true;
    };

    // Build câu thông báo
    const buildMes = () => {
      let mes =
        'Bạn cần nhập các thông tin <span class="strong-text">{0}</span> của Bộ hồ sơ';
      let input = [];
      if (!proxy.model.contract_group_name) {
        input.push("Tên bộ hồ sơ");
      }
      if (!proxy.model.apartment_id) {
        input.push("Căn hộ");
      }
      mes = commonFn.replaceTextWithHTML(mes, input.join(", "));
      return mes;
    };

    // Sau khi thêm thành công thì chuyển sang mode sửa
    const customAfterSaveSuccess = () => {
      if (isAddContract.value) {
        // Cất thành công thì mở form
        proxy.showContractForm();
      }

      proxy.bindData(proxy.model, proxy.dataDetail);
    };

    // Mở form thêm hợp đồng
    //TODO: Làm nốt 2 hợp đồng kia
    const showContractForm = () => {
      proxy.mode = proxy.$constants.formMode.View;
      let param = {
        data: proxy.model,
        mode: proxy.$constants.formMode.Add,
        reloadDetail: proxy.reloadDetail,
      };
      switch (contractType.value) {
        case 0:
          popupUtil.show("ContractDetail", param);
          break;
        case 1:
          popupUtil.show("ContractDetailCtyChu", param);
          break;
        case 2:
          popupUtil.show("ContractDetailCtyKhach", param);
          break;
      }
    };

    // Thực hiện sau khi save cho dù thành công hay không
    const afterSave = () => {
      isAddContract.value = false;
    };

    // Hiển thị form chi tiết hợp đồng
    const editDetail = (row) => {
      commonFn.mask();
      const param = {
        mode: proxy.$constants.formMode.View,
        id: row.contract_id,
        reloadDetail: proxy.reloadDetail,
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

    // Load lại trang
    const reloadDetail = async () => {
      try {
        const res = await proxy.$axios.get(
          `${proxy.module}/${proxy.model.contract_group_id}`
        );
        proxy.data = res.data.master;
        proxy.dataDetail = res.data.details;
        proxy.beforeBindData(proxy.data);
        proxy.bindData(proxy.data, proxy.dataDetail);
        window._listDetail = proxy;
      } catch (error) {
        console.log(error);
      }
    };

    const onClickAciton = (row, action) => {
      switch (action) {
        case "Edit":
          proxy.editDetail(row);
          break;
        case "Delete":
          var title = "Xóa hợp đồng";
          const message = "Bạn có muốn xóa hợp đồng không?";
          confirm(title, message).then(async (answer) => {
            if (answer) {
              commonFn.mask();
              //xóa & đóng
              try {
                const res = await proxy.$axios.delete(`contract`, {
                  data: [row.contract_id],
                });
                if (res.data.length == 0) {
                  // Cập nhật lại List bên ngoài
                  await proxy.reloadDetail();
                  //Hiển thị toast thành công
                  commonFn.toastSuccess("Xóa dữ liệu thành công");
                }
              } catch (error) {
                commonFn.handleError(error, proxy.$router);
              } finally {
                commonFn.unMask();
              }
            }
          });
          break;

        default:
          break;
      }
    };

    // Gán lại giá trị hiển thị cho đúng
    const beforeBindData = (data, detail) => {
      if (detail) {
        detail.forEach((element) => {
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
      }
    };
    return {
      module,
      columns,
      apartmentColumns,
      isAddContract,
      contractType,
      isDetailMaster,
      loadApartmentData,
      selectApartment,
      addContract,
      validateBeforeSave,
      buildMes,
      showContractForm,
      customAfterSaveSuccess,
      beforeShowContractForm,
      afterSave,
      editDetail,
      reloadDetail,
      onClickAciton,
      beforeBindData,
    };
  },
});
</script>

<template>
  <DynamicModal
    ref="ContactDetail"
    :title="`Bộ hồ sơ`"
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
                  :disabled="isView"
                  v-model="model.contract_group_name"
                  :rules="[{ name: 'required' }]"
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
                  :loadComboboxData="loadApartmentData"
                  @selectItem="selectApartment"
                  :disabled="isView"
                  :rules="[{ name: 'required' }]"
                ></TheComboBox>
              </div>
              <div class="modal-row">
                <div class="m-label-text">Chủ nhà</div>
                <TheInput
                  :disabled="true"
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
            <TheButton class="mr-10" @click="addContract(0)"
              >+ HĐ thuê chủ - khách</TheButton
            >
            <TheButton class="mr-10" @click="addContract(1)"
              >+ HĐ thuê chủ - công ty</TheButton
            >
            <TheButton @click="addContract(2)"
              >+ HĐ thuê công ty - khách</TheButton
            >
          </div>
        </div>
        <div class="grids-tab-content">
          <div class="grids-tab-container">
            <GridViewer
              :data="modelDetail"
              @onDbClick="editDetail"
              :columns="columns"
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
    <template #footer>
      <TheButton class="outline-button" @click="hide()">Đóng</TheButton>
      <TheButton @click="setModeEdit()" v-if="isView">Sửa</TheButton>
      <TheButton @click="saveAction()" v-else>Lưu</TheButton>
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
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex: 1;
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
        padding: 10px 0;
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
      overflow: hidden;
      flex: 1;
      padding-top: unset;
      .grids-tab-container {
        height: 100%;
      }
    }
    .action-link {
      color: #0078d7;
      font-weight: 600;
    }
  }
}
</style>
