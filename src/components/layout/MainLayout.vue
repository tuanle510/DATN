<script>
import { ref } from "vue";
import TheNavbar from "./TheNavbar.vue";
import TheHeader from "./TheHeader.vue";
export default {
  components: { TheNavbar, TheHeader },
  props: {},
  setup() {
    const navBarWidth = ref(226);
    const isNavBarClose = ref(false);

    // Đóng mở navbar
    const onCloseNavBar = () => {
      isNavBarClose.value = !isNavBarClose.value;
    };
    return {
      navBarWidth,
      isNavBarClose,
      onCloseNavBar,
    };
  },
};
</script>

<template>
  <main>
    <div class="m-layout">
      <the-navbar
        @onCloseNavBar="onCloseNavBar"
        :isNavBarClose="isNavBarClose"
        :style="{ width: (isNavBarClose ? 66 : 226) + 'px' }"
      ></the-navbar>
      <div class="m-main">
        <the-header />
        <RouterView></RouterView>
      </div>
    </div>
  </main>
</template>

<style>
@import url(../../css/layout/content.css);
</style>
