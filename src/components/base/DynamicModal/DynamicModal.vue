<script>
export default {
  props: {
    // Tiêu đề popup
    title: String,
    width: {
      type: String,
      default: "850px",
    },
    position: {
      type: String,
      default: "center",
    },
  },
};
</script>

<template>
  <VueFinalModal v-slot="{ close }" :clickToClose="false">
    <div :class="[`m-modal-${position}`]" :style="{ width: width }">
      <div class="m-modal-header">
        <div class="m-modal-title">{{ title }}</div>
        <div class="m-modal-close icon-box-24" tooltip="Hủy bỏ" @click="close">
          <div class="close"></div>
        </div>
      </div>

      <div class="m-modal-content" autocomplete="off">
        <slot name="content" :close="close"></slot>
      </div>

      <div class="m-modal-footer">
        <slot name="footer" :close="close"></slot>
      </div>
    </div>
  </VueFinalModal>
</template>
<style></style>
