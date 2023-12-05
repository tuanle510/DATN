<script>
import { ref } from "vue";
export default {
  props: {
    isNavBarClose: {
      default: false,
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const routerList = ref([
      {
        path: "/dashboard",
        icon: "dashboard",
        name: "Tổng quát",
      },
      {
        path: "/owner",
        icon: "setting",
        name: "Chủ nhà",
      },
      {
        path: "/apartment",
        icon: "setting",
        name: "Căn hộ",
      },
      {
        path: "/client",
        icon: "setting",
        name: "Khách hàng",
      },
      {
        path: "/contract",
        icon: "setting",
        name: "Hợp đồng",
      },
      {
        path: "/demo",
        icon: "setting",
        name: "Demo",
      },
    ]);

    // Icon đóng mở navbar
    function onClickToggleNavBar() {
      emit("onCloseNavBar");
    }
    return {
      routerList,
      onClickToggleNavBar,
    };
  },
};
</script>

<template>
  <div class="m-navbar">
    <div class="m-navbar-header">
      <div class="navbar-header-logo"></div>
      <div v-if="!isNavBarClose" class="navbar-header-title">HousingMgnt</div>
    </div>

    <ul class="m-navbar-list">
      <li v-for="(router, index) in routerList" :key="index">
        <RouterLink class="m-link" :to="router.path">
          <div class="navbar-logo">
            <div :class="[router.icon, `${router.icon}-active`]"></div>
          </div>
          <p v-if="!isNavBarClose">{{ router.name }}</p>
        </RouterLink>
      </li>
    </ul>

    <div class="close-navbar">
      <div class="close-navbar-box" @click="onClickToggleNavBar">
        <div v-if="!isNavBarClose" class="close-navbar-icon"></div>
        <div v-else class="open-navbar-icon"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(../../css/layout/navbar.css);
</style>
