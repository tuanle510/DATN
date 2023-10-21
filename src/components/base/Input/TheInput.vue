<script>
export default {
  props: ['modelValue', ''],
  props: {
    modelValue: {
      default: null,
    },
    placeholder: {
      default: null,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return {};
  },
};
</script>

<template>
  <div class="m-input-container">
    <!-- <input
      ref="input"
      class="m-input"
      :type="type"
      :name="name"
      :class="classParent"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :isNumber="isNumber"
      @keypress="onlyNumber"
      @blur="blurInput($event)"
      @focus="focusInput($event)"
    /> -->
    <input
      ref="input"
      class="m-input"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <!-- <div v-if="this.errorMsg" class="m-input-msg">{{ errorMsg }}</div> -->
  </div>
</template>
