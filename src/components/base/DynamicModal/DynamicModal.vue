<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  expose: ['modalId'],
  props: {
    modalName: String,
    default: 'Teen ',
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // close modal
    const close = () => {
      emit('update:modelValue', false);
    };

    return { close };
  },
});
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
