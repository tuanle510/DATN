<script>
import { ref, onMounted, getCurrentInstance, defineComponent } from "vue";
import baseDetail from "../baseDetail";
export default defineComponent({
  extends: baseDetail,
  name: "CanHoDetail",
  setup() {
    const { proxy } = getCurrentInstance();
    const module = "CanHo";
    onMounted(() => {
      proxy.getData();
    });
    const purchaserData = ref([]);
    function getData() {
      purchaserData.value = [];
      for (let i = 0; i < 35; i++) {
        purchaserData.value.push({
          id: i,
          name: "Tuan_" + i,
          address: i % 2 === 0 ? "Cầu Giấy, Hà Nội" : "Thành phố Hồ Chí Minh",
        });
      }
    }
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
      getData,
      module,
      purchaserData,
      columns,
    };
  },
  methods: {},
});
</script>

<template>
  <DynamicModal
    ref="ThemHopDong"
    :title="`Căn hộ ${model.apartment_name || ''}`"
    position="center"
    width="900px"
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
            v-model="model.apartment_name"
            :rule="[{ name: 'required' }]"
          ></TheInput>
          <TheDatepicker class="flex1" label="Ngày sinh"></TheDatepicker>
          <TheInput
            class="flex1"
            label="Số điện thoại"
            :required="true"
          ></TheInput>
        </div>
        <div class="modal-row">
          <TheInput class="flex2" label="Địa chỉ" :required="true"></TheInput>
          <TheInput class="flex1" label="Email" :required="true"></TheInput>
        </div>
        <div class="modal-row">
          <!-- :required="true" -->
          <TheComboBox
            class="flex1"
            label="Chủ sở hữu"
            :columns="columns"
            :dropdownWidth="350"
            placeholder="Chủ sở hữu"
            valueField="id"
            displayField="name"
            v-model="model.purchaser_name"
            :data="purchaserData"
          ></TheComboBox>

          <TheComboBox
            class="flex1"
            label="Chủ sở hữu"
            placeholder="Chủ sở hữu"
            valueField="id"
            displayField="name"
            v-model="model.purchaser_name"
            :data="purchaserData"
          ></TheComboBox>
          <div class="flex1"></div>
        </div>
        <div class="modal-row">
          <TheInput
            class="flex1"
            label="Số CMT/CCCD"
            :required="true"
          ></TheInput>
          <TheDatepicker class="flex1" label="Ngày cấp"></TheDatepicker>

          <TheInput class="flex1" label="Nơi cấp" :required="true"></TheInput>
        </div>
      </div>
      <!-- Phần bên dưới -->
      <!-- <div class="tab-container">
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
      </div> -->
    </template>
    <template #footer>
      <TheButton class="outline-button" @click="hide()">Đóng</TheButton>
      <TheButton @click="hide()">Cất</TheButton>
    </template>
  </DynamicModal>
</template>
<style scoped></style>
