<script>
import { ref, onMounted, getCurrentInstance, defineComponent } from "vue";
import baseDetail from "@/views/baseDetail";
export default defineComponent({
  extends: baseDetail,
  name: "KhachHangDetail",
  props: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const module = "Building";
    // Mặd định vào tab đầu tiên
    const activeTab = ref(0);

    const tabList = [
      {
        tabTitle: "Thông tin chung",
      },
      {
        tabTitle: "Căn hộ",
        columns: [
          {
            width: 100,
            name: "Tên căn hộ",
            dataField: "ten_chu_nha",
          },
          {
            width: 100,
            name: "Chủ nhà",
            dataField: "so_dien_thoai",
          },
          {
            width: 150,
            name: "Địa chỉ",
            dataField: "email",
          },
          {
            width: 150,
            name: "Mô tả",
            dataField: "chung_minh_thu",
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
    ref="BuildingDetail"
    :title="`Tòa nhà`"
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
                  label="Tên tòa nhà"
                  v-model="model.building_name"
                  :rules="[{ name: 'required' }]"
                ></TheInput>
              </div>

              <div class="modal-row">
                <TheInput
                  class="flex1"
                  label="Địa chỉ"
                  v-model="model.building_address"
                ></TheInput>
              </div>

              <div class="modal-row">
                <TheComboBox
                  label="Tỉnh/TP"
                  class="flex1"
                  :data="defaultData"
                  valueField="value"
                  displayField="value"
                  v-model="pageSize"
                  :initValue="pageSize"
                  @selectItem="changePageSize"
                ></TheComboBox>
                <TheComboBox
                  label="Quận/Huyện"
                  class="flex1"
                  :data="defaultData"
                  valueField="value"
                  displayField="value"
                  v-model="pageSize"
                  :initValue="pageSize"
                  @selectItem="changePageSize"
                ></TheComboBox>
              </div>
              <div class="modal-row">
                <TheComboBox
                  label="Xã/Phường"
                  class="flex1"
                  :data="defaultData"
                  valueField="value"
                  displayField="value"
                  v-model="pageSize"
                  :initValue="pageSize"
                  @selectItem="changePageSize"
                ></TheComboBox>
                <div class="flex1"></div>
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
      <TheButton @click="saveAction()">Lưu</TheButton>
    </template>
  </DynamicModal>
</template>
<style scoped>
.grids-tab-container {
  height: 100%;
}
</style>
