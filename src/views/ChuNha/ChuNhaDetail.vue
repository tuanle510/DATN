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
    const tabList = [
      {
        tabTitle: "Thông tin chung",
      },
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

    const purchaserData = [
      {
        name: "Lê Thiện Tuấn 1",
        address: "Duy Tân, Hà Nội",
      },
      {
        name: "Trần Thu hà",
        address:
          "Duy Tân, Hà Nội Duy Tân, Hà Nội Duy Tân, Hà Nội Duy Tân, Hà Nội Duy Tân, Hà Nội Duy Tân, Hà Nội Duy Tân, Hà Nội ",
      },
      {
        name: "Tít",
        address: "Duy Tân, Hà Nội",
      },
      {
        name: "Hà Béo",
        address: "Duy Tân, Hà Nội",
      },
      {
        name: "Lê Thiện Tuấn",
        address: "Duy Tân, Hà Nội",
      },
      {
        name: "Trần Thu hà",
        address: "Duy Tân, Hà Nội",
      },
      {
        name: "Tít",
        address: "Duy Tân, Hà Nội",
      },
      {
        name: "Hà Béo",
        address: "Duy Tân, Hà Nội",
      },
      {
        name: "Lê Thiện Tuấn",
        address: "Duy Tân, Hà Nội",
      },
      {
        name: "Trần Thu hà",
        address: "Duy Tân, Hà Nội",
      },
      {
        name: "Tít",
        address: "Duy Tân, Hà Nội",
      },
      {
        name: "Hà Béo",
        address: "Duy Tân, Hà Nội",
      },
      {
        name: "Lê Thiện Tuấn",
        address: "Duy Tân, Hà Nội",
      },
      {
        name: "Trần Thu hà",
        address: "Duy Tân, Hà Nội",
      },
      {
        name: "Tít",
        address: "Duy Tân, Hà Nội",
      },
      {
        name: "Hà Béo",
        address: "Duy Tân, Hà Nội",
      },
      {
        name: "Lê Thiện Tuấn",
        address: "Duy Tân, Hà Nội",
      },
      {
        name: "Trần Thu hà",
        address: "Duy Tân, Hà Nội",
      },
      {
        name: "Tít",
        address: "Duy Tân, Hà Nội",
      },
      {
        name: "Hà Béo",
        address: "Duy Tân, Hà Nội",
      },
      {
        name: "Lê Thiện Tuấn",
        address: "Duy Tân, Hà Nội",
      },
      {
        name: "Trần Thu hà",
        address: "Duy Tân, Hà Nội",
      },
      {
        name: "Tít",
        address: "Duy Tân, Hà Nội",
      },
      {
        name: "Hà Béo",
        address: "Duy Tân, Hà Nội",
      },
    ];
    const columns = [
      {
        width: 150,
        name: "Tên chủ nhà",
        dataField: "name",
        align: "left",
      },
      {
        name: "Địa chỉ",
        dataField: "address",
        align: "left",
      },
    ];

    return {
      tabList,
      activeTab,
      columnTab,
      dataTab,
      module,
      purchaserData,
      columns,
      onTabClick,
    };
  },
});
</script>

<template>
  <DynamicModal
    ref="ChuNhaDetail"
    title="Thêm chủ nhà"
    width="900px"
    height="530px"
    position="center"
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
                  :required="true"
                  v-model="model.owner_name"
                  :rules="[{ name: 'required' }]"
                ></TheInput>
                <TheDatepicker
                  class="flex1"
                  label="Ngày sinh"
                  v-model="model.birthdate"
                ></TheDatepicker>
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
              </div>
              <div class="modal-row">
                <TheInput
                  class="flex1"
                  label="Tên ngân hàng"
                  v-model="model.paper_number"
                ></TheInput>
                <TheInput
                  class="flex1"
                  label="Số tài khoản"
                  v-model="model.paper_number"
                ></TheInput>

                <TheInput
                  class="flex1"
                  label="Chi nhánh"
                  v-model="model.paper_place"
                ></TheInput>
              </div>
              <TheTextArea label="Ghi chú" v-model="model.note"></TheTextArea>
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
      <TheButton @click="saveAction()">Cất</TheButton>
    </template>
  </DynamicModal>
</template>
<style scoped>
.grids-tab-container {
  height: 100%;
}
</style>
