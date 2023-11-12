<template>
  <label class="m-checkbox">
    <!-- :style="{ border: modelValue ? 'none' : '1px solid #090f39' }" -->
    <input
      type="checkbox"
      :value="modelValue"
      :checked="modelValue"
      @change="$emit('update:modelValue', !modelValue)"
    />
    <span class="checkmark"></span>
  </label>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    modelValue: Boolean, // The value passed via v-model
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    return {};
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
