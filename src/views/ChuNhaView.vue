<script>
import { ref } from 'vue';
import GridViewer from '../components/base/GridViewer/GridViewer.vue';
export default {
  components: { GridViewer },
  props: {},
  setup() {
    const searchInput = ref('');
    return {
      searchInput,
    };
  },
};
</script>

<template>
  <div>
    <div class="m-toolbar">
      <div class="m-toolbar-left">
        <div class="search-field toolbar-field" style="width=179px">
          <!-- ref="searchInput" -->
          <the-input placeholder="Tìm kiếm tài sản" v-model="searchInput" />
          {{ searchInput }}
          <!-- <div class="search-icon">
            <div class="search"></div>
          </div> -->
        </div>
      </div>
      <div class="m-toolbar-right">
        <!-- <MISAButton
          @click="showAddDialog"
          style="box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16)"
          buttonTitle="+Thêm tài sản"
        ></MISAButton> -->
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
