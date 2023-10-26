<script>
import { ref } from "vue";
import popupUtil from "../components/base/DynamicModal/popupUtil";

export default {
  props: {},
  setup() {
    const isChecked = ref(false);
    const columns = ref([
      {
        width: 150,
        name: "Tên chủ nhà",
        dataField: "ten_chu_nha",
      },
      {
        width: 70,
        name: "Điện thoại",
        dataField: "so_dien_thoai",
      },
      {
        width: 150,
        name: "Email",
        dataField: "email",
      },
      {
        width: 150,
        name: "CMT",
        dataField: "chung_minh_thu",
      },
      {
        width: 150,
        name: "CCCD",
        dataField: "Giấy chứng nhận",
      },
      {
        width: 150,
        name: "Ngày sinh",
        dataField: "ngay_sinh",
      },
      {
        width: 150,
        name: "Địa chỉ",
        dataField: "dia_chi",
      },
      {
        width: 150,
        name: "Ghi chú",
        dataField: "ghi_chu",
      },
    ]);
    const datas = ref([
      {
        ten_chu_nha: "Lê Thiện Tuấn",
      },
      {
        ten_chu_nha: "Trần Thị Thu Hà",
      },
      {
        ten_chu_nha: "Lê Thiện Tuấn",
      },
      {
        ten_chu_nha: "Trần Thị Thu Hà",
      },
      {
        ten_chu_nha: "Lê Thiện Tuấn",
      },
      {
        ten_chu_nha: "Trần Thị Thu Hà",
      },
      {
        ten_chu_nha: "Lê Thiện Tuấn",
      },
      {
        ten_chu_nha: "Trần Thị Thu Hà",
      },
      {
        ten_chu_nha: "Lê Thiện Tuấn",
      },
      {
        ten_chu_nha: "Trần Thị Thu Hà",
      },
      {
        ten_chu_nha: "Lê Thiện Tuấn",
      },
      {
        ten_chu_nha: "Trần Thị Thu Hà",
      },
      {
        ten_chu_nha: "Lê Thiện Tuấn",
      },
      {
        ten_chu_nha: "Trần Thị Thu Hà",
      },
      {
        ten_chu_nha: "Lê Thiện Tuấn",
      },
      {
        ten_chu_nha: "Trần Thị Thu Hà",
      },
      {
        ten_chu_nha: "Lê Thiện Tuấn",
      },
      {
        ten_chu_nha: "Trần Thị Thu Hà",
      },
      {
        ten_chu_nha: "Lê Thiện Tuấn",
      },
      {
        ten_chu_nha: "Trần Thị Thu Hà",
      },
      {
        ten_chu_nha: "Lê Thiện Tuấn",
      },
      {
        ten_chu_nha: "Trần Thị Thu Hà",
      },
      {
        ten_chu_nha: "Lê Thiện Tuấn",
      },
      {
        ten_chu_nha: "Trần Thị Thu Hà",
      },
      {
        ten_chu_nha: "Lê Thiện Tuấn",
      },
      {
        ten_chu_nha: "Trần Thị Thu Hà",
      },
      {
        ten_chu_nha: "Lê Thiện Tuấn",
      },
      {
        ten_chu_nha: "Trần Thị Thu Hà",
      },
      {
        ten_chu_nha: "Lê Thiện Tuấn",
      },
      {
        ten_chu_nha: "Trần Thị Thu Hà",
      },
      {
        ten_chu_nha: "Lê Thiện Tuấn",
      },
      {
        ten_chu_nha: "Trần Thị Thu Hà",
      },
      {
        ten_chu_nha: "Lê Thiện Tuấn",
      },
      {
        ten_chu_nha: "Trần Thị Thu Hà",
      },
      {
        ten_chu_nha: "Lê Thiện Tuấn",
      },
      {
        ten_chu_nha: "Trần Thị Thu Hà",
      },
      {
        ten_chu_nha: "Lê Thiện Tuấn",
      },
      {
        ten_chu_nha: "Trần Thị Thu Hà 1111111",
      },
    ]);
    const add = () => {
      popupUtil.show("ThemChuNha");
    };
    return {
      add,
      columns,
      datas,
      isChecked,
    };
  },
};
</script>

<template>
  <div class="chu-nha-view d-flex-column">
    <!-- Phần toolbar-->
    <div class="m-toolbar">
      <div class="m-toolbar-left">
        <span class="m-toolbar-title">Danh sách chủ nhà</span>
      </div>
    </div>
    <div class="above-containter">
      <div class="search-field toolbar-field">
        <TheInput placeholder="Tìm kiếm tài sản" />
      </div>
      <div class="d-flex above-right">
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
    <!-- Phần nội dung -->
    <!-- <div class="m-main-contaiter d-flex-column"> -->
    <GridViewer :columns="columns" :datas="datas"> </GridViewer>
    <!-- </div> -->
  </div>
</template>
<style lang="scss" scoped>
.chu-nha-view {
  width: 100%;
  .above-containter {
    border-radius: 2.5px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    .above-right {
      gap: 16px;
    }
  }
}
</style>
