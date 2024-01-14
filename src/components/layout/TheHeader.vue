<script>
import { ref, getCurrentInstance, defineComponent } from "vue";
export default defineComponent({
  props: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const year = ref(new Date().getFullYear());
    const logout = () => {
      localStorage.clear();
      // Chuyển hướng về trang login
      proxy.$router.push("/login");
    };
    return {
      year,
      logout,
    };
  },
});
</script>

<template>
  <div class="m-topnav">
    <div class="header-left"></div>
    <div class="header-right">
      <!-- <div class="header-right-title">Sở tài chính</div> -->
      <!-- option -->
      <!-- <div class="header-year">
        <div class="header-year-text">Năm</div>
        <div class="header-year-content">{{ year }}</div>
        <div class="year-btn-container">
          <div class="up"></div>
          <div class="down"></div>
        </div>
      </div> -->
      <div class="header-icon">
        <div class="bell"></div>
      </div>
      <div class="header-icon">
        <div class="option"></div>
      </div>
      <div class="header-icon">
        <div class="question"></div>
      </div>
      <div class="header-icon-user">
        <div class="header-icon">
          <div class="user-logo"></div>
        </div>
        <TheMenuWrapper>
          <template #toggle-button="{ toggle }">
            <div class="icon-box-24" @click="toggle">
              <div class="down"></div>
            </div>
          </template>
          <template #default>
            <TheMenuItem @click="logout">Đăng xuất</TheMenuItem>
          </template>
        </TheMenuWrapper>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(@/css/layout/header.css);
</style>
