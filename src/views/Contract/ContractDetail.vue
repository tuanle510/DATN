<script>
import { ref, onMounted, getCurrentInstance, defineComponent } from "vue";
import baseDetail from "../baseDetail";
import { ContractDetailData } from "./ContractDetailData";
import popupUtil from "../../components/base/DynamicModal/popupUtil";
import commonFn from "../../common/commonFn";
import { comboboxColumns } from "../../common/comboboxColumns";
import { comboboxLoadData } from "../../common/comboboxLoadData";

export default defineComponent({
  extends: baseDetail,
  name: "ContractDetail",
  props: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const module = "Contract";
    const isDetailMaster = true;
    const { columns } = ContractDetailData();
    const { clientColumns, contractGroupColumns } = comboboxColumns();
    const { loadClientData, loadContractGroupData } = comboboxLoadData();
    /**
     * Hiển thị form nhập ngày thanh toán
     */
    const choseDesired = () => {
      popupUtil.show("DesiredQuestion", {
        submit: proxy.genPayment,
      });
    };

    /**
     * Auto Gen các dòng thanh toán
     */
    const genPayment = (desired) => {
      //TODO: Chỗ này cần sửa không fix
      const paymentDates = generatePaymentDates(
        proxy.model.start_date,
        proxy.model.end_date,
        proxy.model.payment_period,
        desired
      );
      paymentDates.forEach((x) => {
        var date = new Date(x.start_date);
        x.payment_transaction_id = commonFn.genGuid();
        x.contract_id = proxy.model.contract_id;
        x.payment_batch =
          "T" + (date.getMonth() + 1) + "/" + date.getFullYear();
        x.amount = proxy.model.payment_period * proxy.model.unit_price;
      });
      // Gán vào entity riêng để gửi lên BE
      proxy.modelDetail = [...paymentDates];
    };

    const generatePaymentDates = (startDate, endDate, interval, desired) => {
      const paymentPeriods = [];
      let currentDate = new Date(startDate);

      while (currentDate <= new Date(endDate)) {
        // Ngày bắt đầu kì
        const periodStart = currentDate.toISOString();
        // Cộng thêm số tháng theo Kỳ thanh toán
        currentDate.setMonth(currentDate.getMonth() + interval);
        // Đặt ngày cuối của tháng trước
        currentDate.setDate(0);
        const daysInMonth = currentDate.getDate();
        // Ngày kết thúc kì thanh toán
        const periodEnd = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          daysInMonth
        ).toISOString();

        // Gán bằng ngày thực trả
        let paymentDay = desired;
        // Xử lý trường hợp ngày mong muốn không hợp lệ cho tháng hiện tại
        if (paymentDay > daysInMonth) {
          // Đặt lại ngày là ngày cuối cùng của tháng
          paymentDay = daysInMonth;
        }

        const paymentDate = new Date(periodStart);
        paymentDate.setDate(desired);
        // Nếu ngày thực trả nhỏ hơn ngày kết thúc kì thì thêm vào
        if (paymentDate <= new Date(periodEnd)) {
          paymentPeriods.push({
            start_date: periodStart,
            end_date: periodEnd,
            expected_payment_date: paymentDate.toISOString(),
          });
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return paymentPeriods;
    };

    // Nếu có data từ form ở dưới thì bind vào
    const beforeBinđData = (data) => {
      if (proxy._formParam && proxy._formParam.data) {
        var obj = proxy._formParam.data;
        data.contract_group_id = obj.contract_group_id;
        data.contract_group_name = obj.contract_group_name;
        data.owner_id = obj.owner_id;
        data.owner_name = obj.owner_name;
        data.apartment_id = obj.apartment_id;
        data.apartment_name = obj.apartment_name;
        // Fake data
        data.payment_period = 2;
        data.start_date = new Date();
        data.end_date = new Date(
          new Date().setFullYear(new Date().getFullYear() + 4)
        );
        data.unit_price = 120000000;
      }
    };

    // overide hàm save
    const save = async () => {
      try {
        console.log(proxy.model);
        console.log(proxy.modelDetail);
        var param = {
          master: proxy.model,
          details: proxy.modelDetail,
        };
        const res = await proxy.$axios.post(`${proxy.module}/custom`, param);
        if (res.statusText == "Created") {
          commonFn.toastSuccess("Cất pthành công");
          // Cập nhật lại List bên ngoài
          proxy.afterSaveSuccess();
        }
      } catch (error) {
        console.log(error);
      }
    };

    const customAfterSaveSuccess = () => {
      proxy.binđData(proxy.model, proxy.modelDetail);
    };

    const customBeforeClose = () => {
      if (
        proxy._formParam &&
        proxy._formParam.reloadDetail &&
        typeof proxy._formParam.reloadDetail === "function"
      ) {
        proxy._formParam.reloadDetail();
      }
    };

    return {
      module,
      columns,
      clientColumns,
      contractGroupColumns,
      genPayment,
      choseDesired,
      loadContractGroupData,
      loadClientData,
      beforeBinđData,
      save,
      isDetailMaster,
      customAfterSaveSuccess,
      customBeforeClose,
    };
  },
});
</script>

<template>
  <DynamicModal
    ref="ContactDetail"
    :title="`Hợp đồng ${model.contract_name || ''}`"
    class="contact-detail"
    position="full"
    @beforeOpen="beforeOpen($event, close)"
    @beforeClose="beforeClose($event)"
    @opened="opened"
  >
    <template #content>
      <div class="container-above">
        <!-- Trái  -->
        <div class="container-left flex2">
          <div class="grids-tab-header">
            <div class="item-tabs item-tabs-active">Các bên liên quan</div>
          </div>
          <div class="grids-tab-content">
            <div class="grids-tab-container">
              <div class="modal-row">
                <div class="m-label-text">Căn hộ</div>
                <TheInput
                  class="flex1"
                  disabled
                  v-model="model.apartment_name"
                ></TheInput>
              </div>
              <div class="modal-row">
                <div class="m-label-text">Chủ nhà</div>
                <TheInput
                  class="flex1"
                  disabled
                  v-model="model.owner_name"
                ></TheInput>
              </div>
              <div class="modal-row">
                <div class="m-label-text">Bộ hợp đồng</div>
                <TheComboBox
                  class="flex1"
                  valueField="contract_group_id"
                  displayField="contract_group_name"
                  :queryMode="'remote'"
                  dropdownWidth="500"
                  v-model="model.contract_group_id"
                  v-model:display="model.contract_group_name"
                  :initValue="model.contract_group_name"
                  :columns="contractGroupColumns"
                  :loadComboboxData="loadContractGroupData"
                  :rules="[{ name: 'required' }]"
                  :disabled="view"
                ></TheComboBox>
              </div>
              <div class="modal-row">
                <div class="m-label-text">Khách thuê</div>
                <TheComboBox
                  class="flex1"
                  valueField="client_id"
                  displayField="client_name"
                  :queryMode="'remote'"
                  dropdownWidth="400"
                  v-model="model.client_id"
                  v-model:display="model.client_name"
                  :initValue="model.client_name"
                  :columns="clientColumns"
                  :loadComboboxData="loadClientData"
                  :rules="[{ name: 'required' }]"
                  :disabled="view"
                ></TheComboBox>
              </div>
              <div class="modal-row">
                <div class="m-label-text">Phụ trách</div>
                <TheComboBox
                  class="flex1"
                  valueField="id"
                  displayField="name"
                  v-model="model.purchaser_name"
                  :disabled="view"
                ></TheComboBox>
              </div>
            </div>
          </div>
        </div>
        <!-- Giữa  -->
        <div class="container-center flex5">
          <div class="grids-tab-header">
            <div class="item-tabs item-tabs-active">Giá trị hợp đồng</div>
            <!-- <div class="item-tabs">Ngoại tệ</div> -->
            <div class="item-tabs">Dịch vụ</div>
          </div>
          <div class="grids-tab-content">
            <div class="grids-tab-container">
              <div class="modal-row">
                <div class="m-label-text">Giá thuê</div>
                <TheNumber
                  class="input-money"
                  v-model="model.unit_price"
                  :disabled="view"
                ></TheNumber>
                <div class="m-label-text pl-10">vnđ/tháng</div>
              </div>
              <div class="modal-row">
                <div class="m-label-text">Tiền đặt cọc</div>
                <TheNumber
                  class="input-money"
                  v-model="model.deposit_amount"
                  :disabled="view"
                ></TheNumber>
                <div class="m-label-text pl-10">vnđ</div>
              </div>
              <div class="modal-row">
                <div class="m-label-text">ĐK gia hạn</div>
                <TheTextArea
                  class="flex1"
                  v-model="model.extension_condition"
                  :disabled="view"
                  :rows="5"
                ></TheTextArea>
              </div>
            </div>
          </div>
        </div>
        <!-- Phải  -->
        <div class="container-right flex3">
          <div class="grids-tab-header">
            <div class="item-tabs item-tabs-active">Thời gian hợp đồng</div>
          </div>
          <div class="grids-tab-content">
            <div class="grids-tab-container">
              <div class="modal-row">
                <div class="d-flex flex1">
                  <div class="m-label-text">Từ ngày</div>
                  <TheDatepicker
                    class="flex1"
                    v-model="model.start_date"
                    :disabled="view"
                  ></TheDatepicker>
                </div>
                <div class="d-flex flex1">
                  <div class="m-label-text pl-10">Tới ngày</div>
                  <TheDatepicker
                    class="flex1"
                    :minDate="model.start_date"
                    v-model="model.end_date"
                    :disabled="view"
                  ></TheDatepicker>
                </div>
              </div>
              <div class="modal-row">
                <div class="d-flex flex1">
                  <div class="m-label-text">Kỳ thanh toán</div>
                  <TheNumber
                    class="flex1"
                    v-model="model.payment_period"
                    :disabled="view"
                  ></TheNumber>
                </div>
                <div class="d-flex flex1">
                  <div class="m-label-text pl-10">tháng</div>
                </div>
              </div>
              <div class="modal-row">
                <div class="d-flex flex1">
                  <div class="m-label-text">Ngày nhận nhà</div>
                  <TheDatepicker
                    class="flex1"
                    v-model="model.receive_date"
                    :disabled="view"
                  ></TheDatepicker>
                </div>
                <div class="d-flex flex1">
                  <div class="m-label-text pl-10">Ngày trả nhà</div>
                  <TheDatepicker
                    class="flex1"
                    v-model="model.return_date"
                    :disabled="view"
                  ></TheDatepicker>
                </div>
              </div>
              <div class="modal-row">
                <div class="m-label-text">Ghi chú</div>
                <TheInput
                  class="flex1"
                  v-model="model.note"
                  :disabled="view"
                ></TheInput>
              </div>
              <div class="modal-row">
                <div class="d-flex flex1">
                  <div class="m-label-text">Tình trạng</div>
                  <TheComboBox
                    valueField="id"
                    displayField="name"
                    v-model="model.status"
                    :disabled="view"
                  ></TheComboBox>
                </div>
                <div class="d-flex flex1">
                  <div class="m-label-text pl-10">
                    Thời hạn hợp đồng &nbsp;<span>{{
                      model.contract_term
                    }}</span>
                    &nbsp; tháng
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container-under">
        <div class="grids-tab-header">
          <div class="header-left">
            <div
              class="item-tabs item-tabs-active"
              style="border-right: 1px solid #c1c4cc"
            >
              Các đợt thanh toán hợp đồng
            </div>
            <div class="item-tabs">Các đợt thanh toán dịch vụ</div>
          </div>
          <div class="header-right" @click="choseDesired()">
            <TheButton :disabled="view">Tạo đợt thanh toán hợp đồng</TheButton>
          </div>
        </div>
        <div class="grids-tab-content">
          <div class="grids-tab-container">
            <GridEditor
              :data="modelDetail"
              :columns="columns"
              :disabled="view"
            ></GridEditor>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="m-footer-container">
        <TheButton class="outline-button" @click="hide()">Đóng</TheButton>
        <div class="m-footer-container-right">
          <TheButton
            class="outline-button"
            v-if="mode == $constants.formMode.Edit"
            @click="postpone()"
            >Hoãn</TheButton
          >
          <TheButton @click="setModeEdit()" v-if="view">Sửa</TheButton>
          <TheButton @click="saveAction()" v-else>Cất</TheButton>
        </div>
      </div>
    </template>
  </DynamicModal>
</template>
<style lang="scss">
.contact-detail {
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
      border-right: 1px solid #c1c4cc;
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
    flex: 1;
    flex-direction: column;
    padding: 0 16px;
    .grids-tab-header {
      border: none;
      justify-content: space-between;
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
        overflow: auto;
        height: 100%;
      }
    }
  }
  .m-footer-container {
    width: 100%;
    justify-content: space-between;
    display: flex;
    .m-footer-container-right {
      display: flex;
      gap: 10px;
    }
  }
}
</style>
