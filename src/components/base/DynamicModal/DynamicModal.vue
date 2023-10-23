<script>
export default {
  expose: ['close'],
  props: {
    // Tiêu đề popup
    title: String,
    width: {
      type: String,
      default: '850px',
    },
    position: {
      type: String,
      default: 'center',
    },
  },
  emits: ['update:modelValue', 'close'],
  setup(props, { emit }) {},
};
</script>

<template>
  <VueFinalModal v-slot="{ close }">
    <div :class="[`m-modal-${position}`]" :style="{ width: width }">
      <div class="m-modal-header">
        <div class="m-modal-title">{{ title }}</div>
        <div
          class="m-modal-close icon-box-24 tooltip"
          tooltip="Hủy bỏ"
          @click="close"
        >
          <div class="close"></div>
        </div>
      </div>

      <div class="m-modal-content" autocomplete="off">
        <slot name="content"></slot>
      </div>

      <div class="m-modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </VueFinalModal>
</template>
<style></style>
