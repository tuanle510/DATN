<script>
import { ref, onMounted, getCurrentInstance, defineComponent } from "vue";
import baseDetail from "../baseDetail";
export default defineComponent({
  extends: baseDetail,
  name: "CanHoDetail",
  props: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const module = "Apartment";
    // Mặd định vào tab đầu tiên
    const activeTab = ref(0);

    const tabList = [
      {
        tabTitle: "Thông tin chung",
      },
      {
        tabTitle: "Bộ hợp đồng",
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
      {
        tabTitle: "Hợp đồng",
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
    :title="`Căn hộ ${model.apartment_name || ''}`"
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
                  label="Tên căn hộ"
                  v-model="model.apartment_name"
                  :rules="[{ name: 'required' }]"
                ></TheInput>
                <TheInput
                  class="flex1"
                  label="Địa chỉ"
                  v-model="model.apartment_address"
                  :rules="[{ name: 'required' }]"
                ></TheInput>
                <TheComboBox
                  class="flex1"
                  label="Tòa nhà (Nếu có)"
                  valueField="building_id"
                  displayField="building_name"
                  v-model="model.building_id"
                ></TheComboBox>
              </div>
              <div class="modal-row">
                <TheComboBox
                  class="flex1"
                  label="Chủ sở hữu"
                  valueField="id"
                  displayField="name"
                  v-model="model.purchaser_name"
                ></TheComboBox>
                <div class="flex1"></div>
                <div class="flex1"></div>
              </div>
              <div class="modal-row">
                <TheInput
                  class="flex1"
                  label="Mẫ KH điện lực"
                  v-model="model.paper_number"
                ></TheInput>
                <TheInput
                  class="flex1"
                  label="Mẫ KH internet"
                  v-model="model.paper_number"
                ></TheInput>
                <TheInput
                  class="flex1"
                  label="Mật khẩu"
                  v-model="model.paper_place"
                ></TheInput>
              </div>
              <div class="modal-row">
                <TheInput
                  class="flex1"
                  label="Giấy chứng nhận quyền sở hữu đất"
                  v-model="model.paper_number"
                ></TheInput>
                <TheInput
                  class="flex1"
                  label="Nơi cấp"
                  v-model="model.paper_number"
                ></TheInput>
                <TheDatepicker
                  class="flex1"
                  label="Ngày cấp"
                  v-model="model.birthdate"
                ></TheDatepicker>
              </div>
              <div class="modal-row">
                <TheTextArea
                  class="flex1"
                  label="Mô tả căn hộ"
                  v-model="model.note"
                ></TheTextArea>
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
