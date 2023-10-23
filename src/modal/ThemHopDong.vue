<script>
import { ref, onMounted } from 'vue';
export default {
  props: {},
  setup() {
    return {};
  },
  methods: {},
};
</script>

<template>
  <DynamicModal ref="ThemHopDong" title="Thêm hợp đồng" position="right">
    <template #content>
      <!-- Phần bên trên -->
      <div class="above-container"></div>
    </template>
    <template #footer>
      <TheButton class="outline-button" @click="close">Đóng</TheButton>
      <TheButton @click="save">Cất</TheButton>
    </template>
  </DynamicModal>
</template>
<style scoped></style>
