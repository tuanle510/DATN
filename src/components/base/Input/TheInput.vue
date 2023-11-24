<script>
export default {
  props: {
    modelValue: {
      default: null,
    },
    placeholder: {
      default: null,
    },
    label: {
      default: null,
    },
  },
  emits: ["update:modelValue"],
  methods: {
    focus() {
      this.$refs.TheInput.focus();
    },
  },
};
</script>

<template>
  <div class="m-input-container">
    <div v-if="label" class="m-label">{{ label }}</div>
    <input
      ref="TheInput"
      class="m-input"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
<style scoped>
@import url(../../../css/components/TheInput.css);
</style>
