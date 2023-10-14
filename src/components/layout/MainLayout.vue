<script>
import { ref } from 'vue';
import TheNavbar from './TheNavbar.vue';
import TheHeader from './TheHeader.vue';
export default {
  components: { TheNavbar, TheHeader },
  props: {},
  setup() {
    const navBarWidth = ref(266);
    const isNavBarClose = ref(false);

    // Đóng mở navbar
    const onCloseNavBar = () => {
      if (navBarWidth.value == 66) {
        navBarWidth.value = 226;
        isNavBarClose.value = false;
      } else {
        navBarWidth.value = 66;
        isNavBarClose.value = true;
      }
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
        :style="{ width: navBarWidth + 'px' }"
      ></the-navbar>
      <div
        class="m-main"
        :style="{ width: 'calc(100% - ' + navBarWidth + 'px)' }"
      >
        <the-header />
        <div class="m-content">
          <RouterView></RouterView>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss"></style>
