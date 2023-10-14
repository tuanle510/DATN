<script>
import { ref } from 'vue';
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
        link: '/asset',
        icon: 'asset',
        name: 'Tổng quát',
      },
      {
        link: '/license',
        icon: 'setting',
        name: 'Quản lý',
      },
      {
        link: '/license',
        icon: 'setting',
        name: 'Hóa đơn',
      },
    ]);

    // Icon đóng mở navbar
    function onClickToggleNavBar() {
      emit('onCloseNavBar');
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
      <!-- <div v-if="!isNavBarClose" class="navbar-header-title">HMS</div> -->
      <div class="navbar-header-title">HMS</div>
    </div>

    <ul class="m-navbar-list">
      <li v-for="(router, index) in routerList" :key="index">
        <RouterLink class="m-link" :to="{ path: router.link }">
          <div class="navbar-logo">
            <div :class="[router.icon, `${router.icon}-active`]"></div>
          </div>
          <p v-if="!isNavBarClose">{{ router.name }}</p>
        </RouterLink>
      </li>
    </ul>

    <div class="close-navbar">
      <div class="close-navbar-box" @click="onClickToggleNavBar">
        <!-- <div v-if="!isNavBarClose" class="close-navbar-icon"></div> -->
        <!-- <div v-else class="open-navbar-icon"></div> -->
        <div class="open-navbar-icon"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
