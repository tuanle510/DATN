<script>
export default {
  props: {},
  setup() {
    const closeModal = () => {
      console.log(this);
    };
    return {
      closeModal,
    };
  },
};
</script>

<template>
  <DynamicModal modalName="Thêm chủ nhà" modalId="ThemChuNha">
    <template #header>
      <h1>Custom Header</h1>
    </template>
    <template #content>
      <p>Custom Content</p>
    </template>
    <template #footer>
      <TheButton class="outline-button" @click="closeModal">Đóng</TheButton>
      <TheButton @click="closeModal">Cất</TheButton>
    </template>
  </DynamicModal>
</template>
