<script>
import { ref, onMounted, getCurrentInstance, defineComponent } from "vue";
import baseDetail from "@/views/baseDetail";
import { comboboxColumns } from "@/common/comboboxColumns";
import { comboboxLoadData } from "@/common/comboboxLoadData";
export default defineComponent({
  extends: baseDetail,
  name: "CanHoDetail",
  props: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const module = "Apartment";
    // Mặd định vào tab đầu tiên
    const activeTab = ref(0);
    const tab1 = ref([]);
    const tab2 = ref([]);
    const { ownerColumns, buildingColumns } = comboboxColumns();
    const { loadOwnerData, loadBuildingData } = comboboxLoadData();

    const tabList = [
      {
        tabTitle: "Thông tin chung",
      },
      {
        tabTitle: "Bộ hồ sơ",
        columns: [
          {
            name: "Tên bộ hồ sơ",
            dataField: "contract_group_name",
          },
          {
            width: 250,
            name: "Tên căn hộ",
            dataField: "apartment_name",
          },
          {
            width: 250,
            name: "Chủ nhà",
            dataField: "owner_name",
          },
        ],
      },
      {
        tabTitle: "Hợp đồng",
        columns: [
          {
            width: 100,
            name: "Tên căn hộ",
            dataField: "apartment_name",
          },
          {
            width: 150,
            name: "Bên cho thuê",
            dataField: "owner_name",
          },
          {
            width: 150,
            name: "Bên thuê",
            dataField: "client_name",
          },
          {
            width: 150,
            name: "Ngày bắt đầu",
            dataField: "start_date",
            align: "center",
            type: "date",
          },
          {
            width: 150,
            name: "Ngày kết thúc",
            dataField: "end_date",
            align: "center",
            type: "date",
          },
          {
            width: 150,
            name: "Kiểu hợp đồng",
            dataField: "contract_type",
          },
        ],
      },
    ];
    const columnTab = ref([]);
    const dataTab = ref([]);
    const isFromBuilding = ref(false);
    onMounted(() => {
      columnTab.value = tabList[0].columns;
      isFromBuilding.value = proxy._formParam.isFromBuilding;
    });

    const onTabClick = (index) => {
      activeTab.value = index;
      if (activeTab.value === 0) {
        proxy.opened();
      }
      columnTab.value = tabList[index]?.columns || [];
      switch (index) {
        case 1:
          dataTab.value = tab1.value;
          break;
        case 2:
          dataTab.value = tab2.value;
          break;
      }
    };

    const beforeBindData = (data) => {
      if (proxy._formParam.isFromBuilding) {
        var master = proxy._formParam.data;
        data.building_id = master.building_id;
        data.building_name = master.building_name;
      }
    };

    /**
     * Gán giá trị cho tab1
     * lttuan1
     */
    const customView = (data) => {
      tab1.value = data.tab1 || [];
      tab2.value = data.tab2 || [];
    };

    return {
      tabList,
      activeTab,
      columnTab,
      dataTab,
      module,
      ownerColumns,
      buildingColumns,
      loadOwnerData,
      loadBuildingData,
      beforeBindData,
      onTabClick,
      isFromBuilding,
      customView,
    };
  },
});
</script>

<template>
  <DynamicModal
    ref="CanHoDetail"
    :title="`Căn hộ`"
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
                  :queryMode="'remote'"
                  dropdownWidth="450"
                  v-model="model.building_id"
                  v-model:display="model.building_name"
                  :initValue="model.building_name"
                  :columns="buildingColumns"
                  :quickAddForm="'BuildingDetail'"
                  :loadComboboxData="loadBuildingData"
                  :disabled="isFromBuilding"
                ></TheComboBox>
              </div>
              <div class="modal-row">
                <TheComboBox
                  class="flex1"
                  label="Chủ sở hữu"
                  valueField="owner_id"
                  displayField="owner_name"
                  :queryMode="'remote'"
                  dropdownWidth="450"
                  v-model="model.owner_id"
                  v-model:display="model.owner_name"
                  :initValue="model.owner_name"
                  :columns="ownerColumns"
                  :loadComboboxData="loadOwnerData"
                  :quickAddForm="'OwnerDetail'"
                  :rules="[{ name: 'required' }]"
                ></TheComboBox>
                <div class="flex1"></div>
                <div class="flex1"></div>
              </div>
              <!-- <div class="modal-row">
                <TheInput class="flex1" label="Mẫ KH điện lực"></TheInput>
                <TheInput class="flex1" label="Mẫ KH internet"></TheInput>
                <TheInput class="flex1" label="Mật khẩu"></TheInput>
              </div> -->
              <div class="modal-row">
                <TheInput
                  class="flex1"
                  label="Giấy chứng nhận quyền sở hữu đất"
                ></TheInput>
                <TheInput class="flex1" label="Nơi cấp"></TheInput>
                <TheDatepicker class="flex1" label="Ngày cấp"></TheDatepicker>
              </div>
              <div class="modal-row">
                <TheTextArea
                  class="flex1"
                  label="Mô tả căn hộ"
                  v-model="model.description"
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
            <GridViewer :data="dataTab" :columns="columnTab"></GridViewer>
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
