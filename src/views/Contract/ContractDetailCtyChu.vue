<script>
import { ref, onMounted, getCurrentInstance, defineComponent } from "vue";
import baseDetail from "@/views/baseDetail";
import { ContractDetailData } from "./ContractDetailData";
import popupUtil from "@/components/base/DynamicModal/popupUtil";
import commonFn from "@/common/commonFn";
import { comboboxColumns } from "@/common/comboboxColumns";
import { comboboxLoadData } from "@/common/comboboxLoadData";

export default defineComponent({
  extends: baseDetail,
  name: "ContractDetail",
  props: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const module = "Contract";
    const isDetailMaster = true;
    const { columns, columnsService, columnsServiceDetail } =
      ContractDetailData();
    const { clientColumns, contractGroupColumns } = comboboxColumns();
    const { loadClientData, loadContractGroupData } = comboboxLoadData();
    const upperTab = ref(0);
    const underTab = ref(0);
    const propsData = ref({
      status: {
        data: [
          { value: "Đã trả" },
          { value: "Cần xử lý" },
          { value: "Có sự cố" },
        ],
        valueField: "value",
        displayField: "value",
        freeText: true,
      },
    });
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
      switch (underTab.value) {
        case 0:
          proxy.handlePayment(desired);
          break;
        case 1:
          proxy.handleService(desired);
          break;
      }
    };

    /**
     * Xử lí gen thanh toán dịch vụ
     * @param {*} desired
     */
    const handleService = (desired) => {
      var arr = proxy.serviceList.filter(
        (x) => x.state != "empty" && x.state != "delete"
      );
      var allPayment = [];
      arr.forEach((item) => {
        const paymentDates = generatePaymentDates(
          proxy.model.start_date,
          proxy.model.end_date,
          item.payment_period,
          desired
        );
        var amount = item.payment_period * item.unit_price;
        paymentDates.forEach((x) => {
          var date = new Date(x.start_date);
          x.payment_service_id = commonFn.genGuid();
          x.contract_id = proxy.model.contract_id;
          x.service_name = item.service_name;
          x.state = "insert";
          x.payment_batch =
            "T" + (date.getMonth() + 1) + "/" + date.getFullYear();
          x.amount = amount;
        });
        allPayment = [...allPayment, ...paymentDates];
      });

      if (proxy.serviceDetail && proxy.serviceDetail.length > 0) {
        proxy.serviceDetail = proxy.serviceDetail
          .filter((x) => x.state != "insert")
          .map((x) => {
            x.state = "delete";
            return x;
          });
      }
      allPayment.sort(commonFn.dynamicSort("start_date"));
      proxy.serviceDetail = [...proxy.serviceDetail, ...allPayment];
    };

    /**
     * Xử lí gen thanh toán hợp đồng
     * @param {*} desired
     */
    const handlePayment = (desired) => {
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
        x.state = "insert";
        x.payment_batch =
          "T" + (date.getMonth() + 1) + "/" + date.getFullYear();
        x.amount = proxy.model.payment_period * proxy.model.unit_price;
      });
      if (proxy.modelDetail && proxy.modelDetail.length > 0) {
        proxy.modelDetail = proxy.modelDetail
          .filter((x) => x.state != "insert")
          .map((x) => {
            x.state = "delete";
            return x;
          });
      }
      // Gán vào entity riêng để gửi lên BE
      proxy.modelDetail = [...proxy.modelDetail, ...paymentDates];
    };

    /**
     * Tạo đợt thanh toán
     * @param {*} startDate
     * @param {*} endDate
     * @param {*} interval
     * @param {*} desired
     */
    const generatePaymentDates = (startDate, endDate, interval, desired) => {
      const paymentPeriods = [];
      let currentDate = new Date(startDate).getDateOnly();
      // Xử lí ngày dự tính thanh toán
      desired = desired < 0 ? currentDate.getDate() + desired : desired;

      while (currentDate <= new Date(endDate).getDateOnly()) {
        // Ngày bắt đầu kì
        const periodStart = new Date(currentDate);
        // Cộng thêm số tháng theo Kỳ thanh toán
        currentDate.setMonth(currentDate.getMonth() + interval);
        // Ngày kết thúc kì thanh toán
        var periodEnd = new Date();
        if (currentDate > endDate) {
          periodEnd = new Date(endDate);
        } else {
          periodEnd = new Date(currentDate);
          periodEnd = new Date(periodEnd.setDate(periodEnd.getDate() - 1));
        }

        // Đặt ngày cuối của tháng trước
        var daysInMonth = new Date(currentDate);
        daysInMonth = new Date(daysInMonth.setDate(0)).getDate();
        // Gán bằng ngày thực trả
        let paymentDay = desired > daysInMonth ? daysInMonth : desired;
        const paymentDate = new Date(new Date(periodStart).setDate(paymentDay));
        // Nếu ngày thực trả nhỏ hơn ngày kết thúc kì thì thêm vào
        if (paymentDate <= new Date(periodEnd)) {
          paymentPeriods.push({
            start_date: periodStart,
            end_date: periodEnd,
            expected_payment_date: paymentDate,
          });
        }
      }
      return paymentPeriods;
    };

    // Nếu có data từ form ở dưới thì bind vào
    const beforeBindData = (data) => {
      if (proxy._formParam && proxy._formParam.data) {
        var obj = proxy._formParam.data;
        data.contract_group_id = obj.contract_group_id;
        data.contract_group_name = obj.contract_group_name;
        data.owner_id = obj.owner_id;
        data.owner_name = obj.owner_name;
        data.apartment_id = obj.apartment_id;
        data.apartment_name = obj.apartment_name;
      }
      // Mặc định
      data.contract_type = proxy.$constants.contractType.CCT;
      console.log(data.contract_type);

      // Tạo dòng Dịch vụ mặc định
      if (proxy.serviceList.length == 0) {
        for (let i = 0; i < 3; i++) {
          proxy.serviceList.push({
            contract_service_id: commonFn.genGuid(),
            state: "empty",
            contract_id: data.contract_id,
            emptyRow: true,
          });
        }
      }
    };

    // overide hàm save
    const save = async () => {
      try {
        proxy.handleParam();
        var param = {
          master: proxy.model,
          details: proxy.modelDetail,
          detailsService: proxy.serviceDetail,
          service: proxy.serviceList,
        };
        const res = await proxy.$axios.post(`${proxy.module}/custom`, param);
        if (res.statusText == "Created") {
          commonFn.toastSuccess("Lưu dữ liệu pthành công");
          // Cập nhật lại List bên ngoài
          proxy.afterSaveSuccess();
        }
      } catch (error) {
        commonFn.toastError("Đã có lỗi xảy ra");
        console.log(error);
      }
    };

    // overide hàm edit
    const edit = async () => {
      try {
        proxy.handleParam();
        var param = {
          master: proxy.model,
          details: proxy.modelDetail,
          detailsService: proxy.serviceDetail,
          service: proxy.serviceList,
        };
        const res = await proxy.$axios.put(`${proxy.module}/custom`, param);
        if (res.statusText == "OK") {
          commonFn.toastSuccess("Sửa thành công");
          // Cập nhật lại List bên ngoài
          proxy.afterSaveSuccess();
        }
      } catch (error) {
        commonFn.toastError("Đã có lỗi xảy ra");
        console.log(error);
      }
    };

    const customAfterSaveSuccess = () => {
      proxy.reloadDetail();
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

    /**
     * Thay đổi tab bên trên
     * @param {*} value
     */
    const changeUpperTab = (value) => {
      upperTab.value = value;
    };

    /**
     * Thay đổi tab bên dưới
     * @param {*} value
     */
    const changeUnderTab = (value) => {
      underTab.value = value;
    };

    // Load lại trang
    const reloadDetail = async () => {
      try {
        const res = await proxy.$axios.get(
          `${proxy.module}/${proxy.model.contract_id}`
        );
        proxy.data = res.data.master;
        proxy.dataDetail = res.data.details;
        // Phàn dịch vụ
        proxy.serviceList = res.data.service || [];
        proxy.serviceDetail = res.data.detailsService || [];
        //
        proxy.beforeBindData(proxy.data);
        proxy.bindData(proxy.data, proxy.dataDetail);
        window._listDetail = proxy;
      } catch (error) {
        console.log(error);
      }
    };

    /**
     * Xử lí chung param
     */
    const handleParam = () => {
      var emp = ["none", "empty"];
      proxy.modelDetail = proxy.modelDetail
        .filter((x) => !emp.includes(x.state))
        .map((x) => {
          x.contract_id = proxy.model.contract_id;
          commonFn.standardizedParam(x);
          return x;
        });

      proxy.serviceDetail = proxy.serviceDetail
        .filter((x) => !emp.includes(x.state))
        .map((x) => {
          x.contract_id = proxy.model.contract_id;
          commonFn.standardizedParam(x);
          return x;
        });

      proxy.serviceList = proxy.serviceList
        .filter((x) => !emp.includes(x.state))
        .map((x) => {
          x.contract_id = proxy.model.contract_id;
          commonFn.standardizedParam(x);
          return x;
        });
      commonFn.standardizedParam(proxy.model);
    };

    return {
      module,
      columns,
      columnsService,
      clientColumns,
      columnsServiceDetail,
      contractGroupColumns,
      loadContractGroupData,
      loadClientData,
      isDetailMaster,
      upperTab,
      underTab,
      propsData,
      genPayment,
      choseDesired,
      beforeBindData,
      save,
      edit,
      customAfterSaveSuccess,
      customBeforeClose,
      changeUpperTab,
      changeUnderTab,
      reloadDetail,
      handlePayment,
      handleService,
      handleParam,
    };
  },
});
</script>

<template>
  <DynamicModal
    ref="ContactDetail"
    :title="`Hợp đồng thuê chủ nhà - công ty`"
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
                  :disabled="isView"
                ></TheComboBox>
              </div>
              <div class="modal-row">
                <div class="m-label-text">Công ty thuê</div>
                <TheInput
                  class="flex1"
                  v-model="model.company_name"
                  :disabled="isView"
                ></TheInput>
                <!-- <TheComboBox
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
                  :disabled="isView"
                ></TheComboBox> -->
              </div>
              <div class="modal-row">
                <div class="m-label-text">Phụ trách</div>
                <!-- <TheComboBox
                  class="flex1"
                  valueField="id"
                  displayField="name"
                  v-model="model.purchaser_name"
                  :disabled="isView"
                ></TheComboBox> -->
                <TheInput
                  class="flex1"
                  v-model="model.purchaser_name"
                  :disabled="isView"
                ></TheInput>
              </div>
            </div>
          </div>
        </div>
        <!-- Giữa  -->
        <div class="container-center flex5" style="overflow: hidden">
          <div class="grids-tab-header">
            <div
              :class="['item-tabs', { 'item-tabs-active': upperTab == 0 }]"
              @click="changeUpperTab(0)"
            >
              Giá trị hợp đồng
            </div>
            <div
              :class="['item-tabs', { 'item-tabs-active': upperTab == 1 }]"
              @click="changeUpperTab(1)"
            >
              Dịch vụ
            </div>
          </div>
          <!-- Giá trị hợp đồng -->
          <div class="grids-tab-content" v-show="upperTab == 0">
            <div class="grids-tab-container">
              <div class="modal-row">
                <div class="m-label-text">Giá thuê</div>
                <TheNumber
                  class="input-money"
                  v-model="model.unit_price"
                  :disabled="isView"
                ></TheNumber>
                <div class="m-label-text pl-10">vnđ/tháng</div>
              </div>
              <div class="modal-row">
                <div class="m-label-text">Tiền đặt cọc</div>
                <TheNumber
                  class="input-money"
                  v-model="model.deposit_amount"
                  :disabled="isView"
                ></TheNumber>
                <div class="m-label-text pl-10">vnđ</div>
              </div>
              <div class="modal-row">
                <div class="m-label-text">ĐK gia hạn</div>
                <TheTextArea
                  class="flex1"
                  v-model="model.extension_condition"
                  :disabled="isView"
                  :rows="5"
                ></TheTextArea>
              </div>
            </div>
          </div>
          <!-- Dịch vụ -->
          <div class="grids-tab-content-grid" v-show="upperTab == 1">
            <div class="grids-tab-container">
              <GridEditor
                :data="serviceList"
                v-model:list="serviceList"
                :idField="'contract_service_id'"
                :columns="columnsService"
                :disabled="isView"
              ></GridEditor>
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
                    :disabled="isView"
                  ></TheDatepicker>
                </div>
                <div class="d-flex flex1">
                  <div class="m-label-text pl-10">Tới ngày</div>
                  <TheDatepicker
                    class="flex1"
                    :minDate="model.start_date"
                    v-model="model.end_date"
                    :disabled="isView"
                  ></TheDatepicker>
                </div>
              </div>
              <div class="modal-row">
                <div class="d-flex flex1">
                  <div class="m-label-text">Kỳ thanh toán</div>
                  <TheNumber
                    class="flex1"
                    v-model="model.payment_period"
                    :disabled="isView"
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
                    :disabled="isView"
                  ></TheDatepicker>
                </div>
                <div class="d-flex flex1">
                  <div class="m-label-text pl-10">Ngày trả nhà</div>
                  <TheDatepicker
                    class="flex1"
                    v-model="model.return_date"
                    :disabled="isView"
                  ></TheDatepicker>
                </div>
              </div>
              <div class="modal-row">
                <div class="m-label-text">Ghi chú</div>
                <TheInput
                  class="flex1"
                  v-model="model.note"
                  :disabled="isView"
                ></TheInput>
              </div>
              <div class="modal-row">
                <div class="d-flex flex1">
                  <div class="m-label-text">Tình trạng</div>
                  <TheInput v-model="model.status" :disabled="true"></TheInput>
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
              :class="['item-tabs', { 'item-tabs-active': underTab == 0 }]"
              @click="changeUnderTab(0)"
              style="border-right: 1px solid #c1c4cc"
            >
              Các đợt thanh toán hợp đồng
            </div>
            <div
              :class="['item-tabs', { 'item-tabs-active': underTab == 1 }]"
              @click="changeUnderTab(1)"
            >
              Các đợt thanh toán dịch vụ
            </div>
          </div>
          <div class="header-right" @click="choseDesired()">
            <TheButton :disabled="isView" v-show="underTab == 0"
              >Tạo đợt thanh toán hợp đồng</TheButton
            >
            <TheButton :disabled="isView" v-show="underTab == 1"
              >Tạo đợt thanh toán dịch vụ</TheButton
            >
          </div>
        </div>
        <div class="grids-tab-content">
          <div class="grids-tab-container" v-show="underTab == 0">
            <GridEditor
              :data="modelDetail"
              :columns="columns"
              :disabled="isView"
              v-model:list="modelDetail"
              :idField="'payment_transaction_id'"
              :propsData="propsData"
            ></GridEditor>
          </div>
          <div class="grids-tab-container" v-show="underTab == 1">
            <GridEditor
              :data="serviceDetail"
              :columns="columnsServiceDetail"
              :disabled="isView"
              v-model:list="serviceDetail"
              :idField="'payment_service_id'"
              :propsData="propsData"
            ></GridEditor>
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
      .grids-tab-content-grid {
        flex: 1;
        padding-top: unset;
        display: flex;
        max-height: 200px;
        overflow: hidden;
        .grids-tab-container {
          overflow: hidden;
          width: 100%;
        }
      }
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
