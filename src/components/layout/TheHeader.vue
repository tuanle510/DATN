<script>
import { ref } from 'vue';
export default {
  props: {},
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="m-header">
    <div class="header-left">Danh sách tài sản</div>
    <div class="header-right">
      <div class="header-right-title">Sở tài chính</div>
      <!-- option -->
      <div class="header-year">
        <div class="header-year-text">Năm</div>
        <div class="header-year-content">{{ year }}</div>
        <div class="year-btn-container">
          <div class="up"></div>
          <div class="down"></div>
        </div>
      </div>
      <!--  -->
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
        <div class="down"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
