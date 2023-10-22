<script>
import { defineComponent, ref } from 'vue';

export default {
  expose: ['close'],
  props:
    // Tiêu đề popup
    {
      modalName: String,
      default: '',
    },
  emits: ['update:modelValue'],
  methods: {
    close() {
      this.$emit('update:modelValue', false);
    },
  },
};
</script>

<template>
  <VueFinalModal :clickToClose="false">
    <div class="m-modal">
      <div class="m-modal-header">
        <div class="m-modal-title">{{ modalName }}</div>
        <div
          class="m-modal-close icon-box-24 tooltip"
          tooltip="Hủy bỏ"
          @click="close"
        >
          <div class="close"></div>
        </div>
      </div>

      <form class="m-modal-content" ref="form" autocomplete="off">
        <slot name="content"></slot>
      </form>

      <div class="m-modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </VueFinalModal>
</template>
<style></style>
