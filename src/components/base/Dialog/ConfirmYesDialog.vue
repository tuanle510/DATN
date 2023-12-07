<template>
  <div class="m-dialog">
    <div class="m-dialog-container">
      <div class="m-dialog-header">
        {{ title }}
        <div class="m-dialog-close icon-box-24" @click="closeDialog(false)">
          <div class="close"></div>
        </div>
      </div>
      <div v-html="content" class="m-dialog-content"></div>
      <div class="m-dialog-footer">
        <TheButton ref="button" @click="closeDialog()">Đồng ý</TheButton>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { closeDialog } from "vue3-promise-dialog";

export default defineComponent({
  props: {
    title: String,
    content: String,
  },
  mounted() {
    this.$refs.button.setFocus();
  },
  setup() {
    function returnValue() {
      return true;
    }
    return {
      returnValue,
      closeDialog,
    };
  },
});
</script>

<style lang="scss" scoped>
.m-dialog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2000;
  .m-dialog-close {
    position: absolute !important;
    top: 10px;
    right: 10px;
    &:hover {
      cursor: pointer;
      background-color: #eee;
    }
    &:active {
      background-color: #fefefe;
    }
  }

  .m-dialog-container {
    position: fixed;
    width: 450px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    box-shadow: 0 3px 20px #00000014;
    border-radius: 4px;
    .m-dialog-header {
      font-size: 18px;
      font-weight: 700;
      padding: 20px 20px 0;
    }
    .m-dialog-content {
      margin-top: 15px;
      margin: 15px 20px 20px;
      max-height: 300px;
      overflow: auto;
    }
    .m-dialog-footer {
      bottom: 0px;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      align-items: center;
      padding: 8px 16px;
      width: 100%;
      background-color: #f5f5f5;
      border-radius: 0 0 3px 3px;
    }
  }
}
</style>
