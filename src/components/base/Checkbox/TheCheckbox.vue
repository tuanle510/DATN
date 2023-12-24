<template>
  <label class="m-checkbox">
    <input
      type="checkbox"
      :value="isChecked"
      :checked="isChecked"
      @change="$emit('update:modelValue', !modelValue)"
    />
    <span class="checkmark"></span>
  </label>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    modelValue: Boolean, // The value passed via v-model
    checked: {
      type: [Boolean, Number],
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const isChecked = computed(() => props.modelValue || props.checked);
    return {
      isChecked,
    };
  },
});
</script>
<style lang="scss" scoped>
.m-checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14px;
  height: 14px;
  border-radius: 2px;
  background: #fff;
  border: 1px solid #000;
}

input[type="checkbox"] {
  display: none;
}

input[type="checkbox"]:checked + .checkmark {
  background: url("/src/assets/icon/qlts-icon.png") no-repeat -157px -377px;
  width: 14px;
  height: 14px;
  border-radius: 2px;
}

.m-checkbox:has(input[type="checkbox"]:checked) {
  border: none;
}
</style>
