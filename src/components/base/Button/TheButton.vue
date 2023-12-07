<script>
export default {
  name: "the-button",
  props: [],
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
  <button class="m-button" ref="button">
    <slot> </slot>
  </button>
</template>
<style></style>
