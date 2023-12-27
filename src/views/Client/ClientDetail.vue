<script>
import { ref, onMounted, getCurrentInstance, defineComponent } from "vue";
import baseDetail from "../baseDetail";
export default defineComponent({
  extends: baseDetail,
  name: "KhachHangDetail",
  props: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const module = "Client";
    // Mặd định vào tab đầu tiên
    const activeTab = ref(0);

    const tabList = [
      {
        tabTitle: "Thông tin chung",
      },
      {
        tabTitle: "Hợp đồng thuê",
        columns: [
          {
            width: 100,
            name: "Tên căn hộ",
            dataField: "ten_chu_nha",
          },
          {
            width: 100,
            name: "Mã",
            dataField: "so_dien_thoai",
          },
          {
            width: 150,
            name: "Tên căn hộ",
            dataField: "email",
          },
          {
            width: 150,
            name: "Mã căn hộ",
            dataField: "chung_minh_thu",
          },
          {
            width: 150,
            name: "Chủ nhà",
            dataField: "Giấy chứng nhận",
          },
        ],
      },
    ];
    const columnTab = ref(tabList[1].columns);
    const dataTab = ref([
      {
        ten_chu_nha: "Tuấn lê",
        so_dien_thoai: "012314124124",
      },
    ]);
    onMounted(() => {
      columnTab.value = tabList[0].columns;
    });

    const onTabClick = (index) => {
      activeTab.value = index;
      if (activeTab.value === 0) {
        proxy.opened();
      }
      columnTab.value = tabList[index]?.columns || [];
      dataTab.value = tabList[index]?.data || [];
    };

    return {
      tabList,
      activeTab,
      columnTab,
      dataTab,
      module,
      onTabClick,
    };
  },
});
</script>

<template>
  <DynamicModal
    ref="CanHoDetail"
    :title="`Khách hàng ${model.apartment_name || ''}`"
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
                <TheTextArea
                  class="flex1"
                  label="Ghi chú"
                  v-model="model.note"
                ></TheTextArea>
              </div>
            </div>
          </div>
          <div class="grids-tab-container" v-else>
            <GridViewer :data="[]" :columns="columnTab"></GridViewer>
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
<style scoped>
.grids-tab-container {
  height: 100%;
}
</style>
