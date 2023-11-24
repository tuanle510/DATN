<script>
import { ref, onMounted, getCurrentInstance, defineComponent } from "vue";
import baseDetail from "../baseDetail";
export default defineComponent({
  extends: baseDetail,
  name: "ChuNhaDetail",
  props: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const module = "ChuNha";
    // Mặd định vào tab đầu tiên
    const activeTab = ref(0);
    const columnTab = ref([]);
    const dataTab = ref([]);
    onMounted(() => {
      columnTab.value = tabList[0].columns;
    });
    const tabList = [
      {
        tabTitle: "Nhà/Căn hộ sở hữu",
        columns: [
          {
            width: 100,
            name: "Tên căn hộ",
            dataField: "ten_chu_nha",
          },
          {
            width: 100,
            name: "Tên tòa nhà",
            dataField: "so_dien_thoai",
          },
          {
            width: 150,
            name: "Địa chỉ",
            dataField: "email",
          },
          {
            width: 150,
            name: "Giấy chứng nhận số",
            dataField: "chung_minh_thu",
          },
          {
            width: 150,
            name: "Giấy chứng nhận",
            dataField: "Giấy chứng nhận",
          },
          {
            width: 150,
            name: "Giấy chứng nhận ngày cấp",
            dataField: "ngay_sinh",
          },
          {
            width: 150,
            name: " Mô tả",
            dataField: "dia_chi",
          },
        ],
      },
      {
        tabTitle: "Bộ hợp đồng",
      },
      {
        tabTitle: "Hợp đồng",
      },
    ];
    const onTabClick = (index) => {
      activeTab.value = index;
      columnTab.value = tabList[index]?.columns || [];
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
  methods: {},
});
</script>

<template>
  <DynamicModal
    ref="ChuNhaDetail"
    title="Thêm chủ nhà"
    width="900px"
    position="center"
    @beforeOpen="beforeOpen($event, close)"
    @beforeClose="beforeClose($event)"
    @opened="opened"
  >
    <template #content>
      <!-- Phần bên trên -->
      <div class="above-container">
        <div class="modal-row">
          <TheInput
            class="flex1"
            label="Họ và tên"
            :required="true"
            v-model="model.owner_name"
          ></TheInput>
          <TheDatepicker class="flex1" label="Ngày sinh"></TheDatepicker>
          <TheInput
            class="flex1"
            label="Số điện thoại"
            :required="true"
            v-model="model.phone_number"
          ></TheInput>
        </div>
        <div class="modal-row">
          <TheInput
            class="flex2"
            label="Địa chỉ"
            v-model="model.address"
          ></TheInput>
          <TheInput
            class="flex1"
            label="Email"
            v-model="model.email"
          ></TheInput>
        </div>
        <!-- <div class="modal-row">
          :required="true"
          <TheComboBox
            class="flex1"
            label="Loại giấy tờ"
            ref="DepartmentCode"
            placeholder="Loại giấy tờ"
            filterby="DepartmentCode"
          ></TheComboBox>
          <div class="flex1"></div>
          <div class="flex1"></div>
        </div> -->
        <div class="modal-row">
          <TheInput
            class="flex1"
            label="Số CMT/CCCD"
            v-model="model.paper_date"
          ></TheInput>
          <TheDatepicker
            class="flex1"
            label="Ngày cấp"
            v-model="model.paper_number"
          ></TheDatepicker>

          <TheInput
            class="flex1"
            label="Nơi cấp"
            v-model="model.paper_place"
          ></TheInput>
        </div>
      </div>
      <!-- Phần bên dưới -->
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
          <div class="m-toolbar">
            <div class="m-toolbar-left">
              <div class="toolbar-field" style="width=179px">
                <TheInput placeholder="Tìm kiếm" />
              </div>
            </div>
            <div class="m-toolbar-right"></div>
          </div>
          <div class="grids-tab-container" v-if="activeTab == 0">
            <GridViewer :columns="columnTab" :datas="[]"></GridViewer>
          </div>
          <div v-if="activeTab == 1">Tab2</div>
          <div v-if="activeTab == 2">Tab3</div>
        </div>
      </div>
    </template>
    <template #footer>
      <TheButton class="outline-button" @click="hide()">Đóng</TheButton>
      <TheButton @click="hide()">Cất</TheButton>
    </template>
  </DynamicModal>
</template>
<style scoped>
.grids-tab-container {
  height: calc(100% - 30px);
}
</style>
