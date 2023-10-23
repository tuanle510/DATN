<script>
import { ref } from 'vue';
import popupUtil from '../components/base/DynamicModal/popupUtil';

export default {
  props: {},
  setup() {
    const add = () => {
      popupUtil.show('ThemChuNha');
    };
    return {
      add,
    };
  },
};
</script>

<template>
  <div>
    <div class="m-toolbar">
      <div class="m-toolbar-left">
        <div class="search-field toolbar-field" style="width=179px">
          <TheInput placeholder="Tìm kiếm tài sản" />
        </div>
      </div>
      <div class="m-toolbar-right">
        <TheButton
          @click="add()"
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

    <GridViewer :columns="[]" :datas="[]"> </GridViewer>
  </div>
</template>
