<script>
// import { show } from '../components/base/DynamicModal/popup.js';
import { ref } from 'vue';
import { useModal } from 'vue-final-modal';
import popupUtil from '../components/base/DynamicModal/popupUtil';
export default {
  props: {},
  setup() {
    const modalName = ref('ThemChuNha');
    const popup = useModal({
      component: modalName,
    });
    const showAddDialog = () => {
      popup.open();
    };
    return {
      showAddDialog,
    };
  },
};
</script>

<template>
  <div>
    <div class="m-toolbar">
      <div class="m-toolbar-left">
        <div class="search-field toolbar-field" style="width=179px">
          <the-input placeholder="Tìm kiếm tài sản" />
        </div>
      </div>
      <div class="m-toolbar-right">
        <TheButton
          @click="showAddDialog()"
          style="box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16)"
          >Thêm
        </TheButton>
        <div class="toolbar-btn">
          <div class="excel"></div>
        </div>
        <div class="toolbar-btn" @click="btnRemove">
          <div class="remove"></div>
        </div>
      </div>
    </div>

    <grid-viewer columns="" datas=""> </grid-viewer>
  </div>
</template>
