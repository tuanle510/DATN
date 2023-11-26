<template>
  <the-button @click="showToastSuccess">Toast success</the-button>
  <the-button @click="showToastError">Toast Error</the-button>
</template>
<script>
import commonFn from "../common/commonFn";

export default {
  methods: {
    showToastSuccess() {
      commonFn.toastSuccess();
    },
    showToastError() {
      commonFn.toastError();
    },
  },
};
</script>
