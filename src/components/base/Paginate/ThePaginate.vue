<script>
import { defineComponent } from "vue";
import Paginate from "vuejs-paginate-next";

export default defineComponent({
  components: { Paginate },
  props: {
    // Tổng số bản ghi
    total: {
      type: Number,
      default: null,
    },
  },
  emits: ["update:modelValue", "clickHandler"],
  computed: {
    pageCount() {
      return this.total ? Math.ceil(this.total / this.pageSize) : 0;
    },
  },
  methods: {
    /**
     * emit sự kiện ra ngoài
     */
    clickHandler() {
      let payload = {
        skip: this.pageSize * (this.pageIndex - 1),
        take: this.pageSize,
      };
      this.$emit("clickHandler", payload);
    },
    /**
     * Sự kiện chuyển trang
     * @param {*} pageIndex
     */
    changePageIndex(pageIndex) {
      this.clickHandler();
    },

    /**
     * Sự kiện đổi số bản ghi trên 1 trang
     */
    changePageSize(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize.value;
      this.clickHandler();
    },
  },
  data() {
    return {
      defaultData: [
        { value: 10 },
        { value: 20 },
        { value: 50 },
        { value: 100 },
      ],
      pageSize: 20,
      pageIndex: 1,
    };
  },
});
</script>
<template>
  <div class="m-paginate-container">
    <TheComboBox
      class="m-page-size"
      :data="defaultData"
      valueField="value"
      displayField="value"
      position="top"
      :isOnlyChoose="true"
      v-model="pageSize"
      @selectItem="changePageSize"
    ></TheComboBox>
    <Paginate
      v-model="pageIndex"
      :page-count="pageCount"
      :click-handler="changePageIndex"
      :prev-text="''"
      :next-text="''"
      :container-class="'m-paginate'"
    >
    </Paginate>
  </div>
</template>
<style lang="scss">
.m-paginate-container {
  display: flex;
  align-items: center;
  .m-page-size {
    width: 70px;
    margin-right: 10px;
  }
  .m-paginate {
    display: flex;
    .page-item {
      cursor: pointer;
      height: 25px;
      width: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3px;
      margin-right: 5px;
    }

    .page-link {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .page-item:first-child .page-link {
      cursor: pointer;
      background: url("/src/assets/icon/qlts-icon.png") no-repeat -29px -246px;
      width: 7px;
      height: 12px;
    }

    .page-item:last-child .page-link {
      cursor: pointer;
      background: url("/src/assets/icon/qlts-icon.png") no-repeat -73px -246px;
      width: 7px;
      height: 12px;
    }
    .page-item.active {
      background-color: #f5f5f5;
      font-weight: 700;
      border: 1px solid #b7b7b7;
    }
  }
}
</style>
