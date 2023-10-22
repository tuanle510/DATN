<script>
import { ref } from 'vue';
import baseDetailPopup from '../components/base/DynamicModal/baseDetailPopup.js';
export default {
  extends: baseDetailPopup,
  props: {},
  setup() {
    const modalName = 'ThemChuNha';
    return {
      modalName,
    };
  },
  methods: {},
};
</script>

<template>
  <DynamicModal ref="ThemChuNha" modalName="Thêm chủ nhà">
    <template #header>
      <h1>Custom Header</h1>
    </template>
    <template #content>
      <p>Custom Content</p>
    </template>
    <template #footer>
      <TheButton class="outline-button" @click="close">Đóng</TheButton>
      <TheButton @click="save">Cất</TheButton>
    </template>
  </DynamicModal>
</template>
