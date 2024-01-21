<script>
import { ref, onMounted, getCurrentInstance, defineComponent } from "vue";
import baseDetail from "@/views/baseDetail";
export default defineComponent({
  extends: baseDetail,
  name: "KhachHangDetail",
  props: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const module = "Client";
    // Mặd định vào tab đầu tiên
    const activeTab = ref(0);
    const tab1 = ref([]);

    const tabList = [
      {
        tabTitle: "Thông tin chung",
    },
      {
        tabTitle: "Hợp đồng thuê",
      },
    ];
    const columnTab = ref([
      {
        name: "Tên bộ hồ sơ",
        dataField: "contract_group_name",
      },
      {
        width: 120,
        name: "Tên căn hộ",
        dataField: "apartment_name",
      },
      {
        width: 100,
        name: "Giá thuê",
        dataField: "unit_price",
        type: "currency",
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
        width: 100,
        name: "Trạng thái",
        dataField: "status",
      },
      {
        width: 150,
        name: "Kiểu hợp đồng",
        dataField: "contract_type",
      },
    ]);

    const onTabClick = (index) => {
      activeTab.value = index;
      if (activeTab.value === 0) {
        proxy.opened();
      }
    };

    /**
     * Gán giá trị cho tab1
     * lttuan1
     */
    const customView = (data) => {
      tab1.value = data.tab1 || [];
    };

    return {
      tabList,
      activeTab,
      columnTab,
      tab1,
      module,
      onTabClick,
      customView,
    };
  },
});
</script>

<template>
  <DynamicModal
    ref="CanHoDetail"
    :title="`Khách hàng`"
    width="900px"
    position="right"
    @beforeOpen="beforeOpen($event, close)"
    @beforeClose="beforeClose($event)"
    @opened="opened"
  >
    <template #content>
      <div class="tab-container">
        <div class="grids-tab-header">
          <div
            :class="['item-tabs', activeTab == index ? 'item-tabs-active' : '']"
            v-for="(tab, index) in tabList"
            :key="index"
            @click="onTabClick(index)"
          >
            {{ tab.tabTitle }}
          </div>
        </div>
        <div class="grids-tab-content">
          <div class="grids-tab-container" v-if="activeTab == 0">
            <div class="above-container">
              <div class="modal-row">
                <TheInput
                  class="flex1"
                  label="Họ và tên"
                  v-model="model.client_name"
                  :rules="[{ name: 'required' }]"
                ></TheInput>
                <TheDatepicker
                  class="flex1"
                  label="Ngày sinh"
                  v-model="model.birthdate"
                  :rules="[{ name: 'required' }]"
                ></TheDatepicker>
                <TheInput
                  class="flex1"
                  label="Số điện thoại"
                  v-model="model.phone_number"
                  :rules="[{ name: 'required' }]"
                ></TheInput>
                <TheInput
                  class="flex1"
                  label="Email"
                  v-model="model.email"
                  :rules="[{ name: 'required' }]"
                ></TheInput>
              </div>
              <div class="modal-row">
                <TheInput
                  class="flex1"
                  label="Số CMT/CCCD"
                  v-model="model.paper_number"
                ></TheInput>
                <TheDatepicker
                  class="flex1"
                  label="Ngày cấp"
                  v-model="model.paper_date"
                ></TheDatepicker>
                <TheInput
                  class="flex1"
                  label="Nơi cấp"
                  v-model="model.paper_place"
                ></TheInput>
                <div class="flex1"></div>
              </div>

              <div class="modal-row">
                <TheInput
                  class="flex1"
                  label="Tên trợ lý"
                  v-model="model.assistant_name"
                ></TheInput>
                <TheInput
                  class="flex1"
                  label="Số điện thoại"
                  v-model="model.assistant_phone"
                ></TheInput>
                <TheInput
                  class="flex1"
                  label="Email"
                  v-model="model.assistant_email"
                ></TheInput>
                <div class="flex1"></div>
              </div>

              <div class="modal-row">
                <TheInput
                  class="flex1"
                  label="Công ty/Đơn vị"
                  v-model="model.company_name"
                ></TheInput>
                <TheInput
                  class="flex1"
                  label="Mẫ số thuế"
                  v-model="model.company_tax_code"
                ></TheInput>
                <TheInput
                  class="flex1"
                  label="Đại diện công ty"
                  v-model="model.company_ref"
                ></TheInput>
                <TheInput
                  class="flex1"
                  label="Chức vụ"
                  v-model="model.company_ref_role"
                ></TheInput>
              </div>

              <div class="modal-row">
                <TheInput
                  class="flex2"
                  label="Địa chỉ"
                  v-model="model.company_address"
                ></TheInput>
                <TheInput
                  class="flex1"
                  label="Điện thoại"
                  v-model="model.company_phone"
                ></TheInput>
                <TheInput
                  class="flex1"
                  label="Fax"
                  v-model="model.company_fax"
                ></TheInput>
              </div>

              <div class="modal-row">
                <TheTextArea
                  class="flex1"
                  label="Ghi chú"
                  v-model="model.note"
                ></TheTextArea>
              </div>
            </div>
          </div>
          <div class="grids-tab-container" v-else>
            <GridViewer
              :data="tab1"
              :columns="columnTab"
              :isAction="false"
            ></GridViewer>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <TheButton class="outline-button" @click="hide()">Đóng</TheButton>
      <TheButton @click="saveAction()">Lưu</TheButton>
    </template>
  </DynamicModal>
</template>
<style scoped>
.grids-tab-container {
  height: 100%;
}
</style>
