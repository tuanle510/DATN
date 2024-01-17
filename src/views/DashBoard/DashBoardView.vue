<script>
import { ref, onMounted } from "vue";
import { defineComponent } from "vue";
import { DoughnutChart, BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
export default defineComponent({
  name: "Home",
  components: { DoughnutChart, BarChart },
  setup() {
    onMounted(() => {
      //Gọi api load dữ liệu
    });
    const rightData = {
      labels: ["HĐ Chủ - khách", "HĐ Chủ - C.ty", "HĐ C.ty - khách"],
      datasets: [
        {
          data: [30, 40, 60],
          backgroundColor: ["#77CEFF", "#0079AF", "#123E6B"],
        },
      ],
    };

    const leftData = {
      labels: [
        "T1",
        "T.2",
        "T.3",
        "T.4",
        "T.5",
        "T.6",
        "T.7",
        "T.8",
        "T.9",
        "T.10",
        "T.11",
        "T.12",
      ],
      datasets: [
        {
          label: "Tổng số hợp đồng",
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: ["#77CEFF"],
        },
      ],
    };

    return { rightData, leftData };
  },
});
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
        <div class="m-dashboard-item">
          <div class="item-avatar client-bg"></div>
          <div class="d-flex-column">
            <div class="m-dashboard-number">20</div>
            <div class="m-dashboard-text">Khách thuê</div>
          </div>
        </div>
        <div class="m-dashboard-item">
          <div class="item-avatar owner-bg"></div>
          <div class="d-flex-column">
            <div class="m-dashboard-number">30</div>
            <div class="m-dashboard-text">Chủ nhà</div>
          </div>
        </div>
        <div class="m-dashboard-item">
          <div class="item-avatar building-bg"></div>
          <div class="d-flex-column">
            <div class="m-dashboard-number">10</div>
            <div class="m-dashboard-text">Tòa nhà</div>
          </div>
        </div>
        <div class="m-dashboard-item">
          <div class="item-avatar apartment-bg"></div>
          <div class="d-flex-column">
            <div class="m-dashboard-number">36</div>
            <div class="m-dashboard-text">Căn hộ</div>
          </div>
        </div>

        <!-- <div class="m-dashboard-item-full">
          <div class="m-dashboard-number">50</div>
          <div class="m-dashboard-text">Hợp đồng</div>
        </div> -->
      </div>
      <div class="m-dashboard-under">
        <div class="chart-header">
          Thống kê số hợp đồng năm {{ new Date().getFullYear() }}
        </div>
        <div class="chart-main">
          <div class="chart-left">
            <BarChart :chartData="leftData" />
          </div>
          <div class="chart-right">
            <DoughnutChart :chartData="rightData" />
          </div>
        </div>
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
    // height: calc(100% - 426px);
    height: 160px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    .m-dashboard-item {
      &:hover {
        border: 1px solid #22a7ca;
      }
      border: 1px solid #ccc;
      padding: 10px;
      border-radius: 3px;
      display: flex;
      align-items: center;
      .m-dashboard-number {
        font-size: 20px;
        font-weight: bold;
      }
    }
    .m-dashboard-item-full {
      grid-column: 1 / span 4; /* Đặt cột này để bắt đầu từ cột 1 và trải dài qua 4 cột */
      border: 1px solid #ccc;
      padding: 10px;
      border-radius: 3px;
      display: flex;
      flex-direction: column;
      .m-dashboard-number {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }

  .m-dashboard-under {
    height: calc(100% - 160px);
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    .chart-header {
      height: 16px;
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .chart-main {
      display: flex;
      flex: 1;
      gap: 16px;
      .chart-left {
        flex: 1;
      }
      .chart-right {
        flex: 1;
      }
    }
  }

  .item-avatar {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-position: center;
    background-color: #1aa4c8;
    background-repeat: no-repeat;
    border-radius: 50px;
    margin-right: 20px;
  }

  .client-bg {
    background-image: url(../../assets/img/client-active.png);
  }
  .owner-bg {
    background-image: url(../../assets/img/owner-active.png);
  }
  .building-bg {
    background-image: url(../../assets/img/building-active.png);
  }
  .apartment-bg {
    background-image: url(../../assets/img/apartment-active.png);
  }
}
</style>
