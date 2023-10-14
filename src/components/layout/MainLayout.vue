<script>
import { ref } from 'vue';
export default {
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
      <MISANavbar
        @onCloseNavBar="onCloseNavBar"
        :isNavBarClose="isNavBarClose"
        :style="{ width: navBarWidth + 'px' }"
      />
      <div
        class="m-main"
        :style="{ width: 'calc(100% - ' + navBarWidth + 'px)' }"
      >
        <MISAHeader />
        <div class="m-content">
          <RouterView></RouterView>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss"></style>
