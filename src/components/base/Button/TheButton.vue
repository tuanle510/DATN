<script>
export default {
  name: "the-button",
  props: {
    disabled: {
      default: false,
    },
  },
  setup(props, { emit }) {
    return {};
  },
  methods: {
    setFocus() {
      this.$refs.button.focus();
    },
  },
};
</script>
<template>
  <button class="m-button" ref="button" :disabled="disabled">
    <slot> </slot>
  </button>
</template>
<style></style>
