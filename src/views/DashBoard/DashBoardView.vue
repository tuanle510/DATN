<script>
import { ref } from "vue";
export default {
  props: {},
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="m-view">
    <!-- Phần tiêu đề-->
    <div class="m-header">
      <span class="m-header-title">DashBoard</span>
    </div>
    <!-- Phần nội dung -->
    <div class="m-container">
      <div class="m-dashboard-above">
        <div class="m-dashboard-item">Khách thuê</div>
        <div class="m-dashboard-item">Căn hộ</div>
        <div class="m-dashboard-item">Tòa nhà</div>
        <div class="m-dashboard-item">Chủ nhà</div>
        <div class="m-dashboard-item-full">Hợp đồng</div>
      </div>
      <div class="m-dashboard-under">
        <div class="chart-header">Thống kê</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url(@/css/baseList.scss);
.m-container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  .m-dashboard-above {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    .m-dashboard-item {
      border: 1px solid #ccc;
      padding: 20px;
      text-align: center;
      border-radius: 3px;
    }
    .m-dashboard-item-full {
      grid-column: 1 / span 4; /* Đặt cột này để bắt đầu từ cột 1 và trải dài qua 4 cột */
      border: 1px solid #ccc;
      padding: 20px;
      text-align: center;
      border-radius: 3px;
    }
  }

  .m-dashboard-under {
    margin-top: 16px;
    display: flex;
    flex: 1;
    overflow: hidden;
    flex-direction: column;
    .chart-header {
      font-size: 16px;
      font-weight: 700;
    }
  }
}
</style>
