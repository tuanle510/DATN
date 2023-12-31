<script>
import { defineComponent, computed, getCurrentInstance } from "vue";
import { useValidateControl } from "@/common/validateControl";
export default defineComponent({
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
    rules: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Number,
      default: 3, // Số hàng mặc định
    },
    disabled: {
      default: false,
    },
  },
  emits: ["update:modelValue"],
  mounted() {
    const me = this;
    if (me.$el && !me.$el.getVueInstance) {
      me.$el.getVueInstance = () => {
        return this;
      };
    }
  },
  methods: {
    focus() {
      this.$refs.TheInput.focus();
    },

    async onChangeHandler($event) {
      await this.$emit("update:modelValue", $event.target.value);
      this.validate();
    },
  },

  setup(props) {
    const { proxy } = getCurrentInstance();
    const { errorMessage, validate, isValidate } = useValidateControl({
      props,
    });

    /**
     * Hủy lan rộng event
     */
    const cancelEvent = (e) => {
      if (e) {
        if (typeof e.preventDefault === "function") {
          e.preventDefault();
        }

        if (typeof e.stopPropagation === "function") {
          e.stopPropagation();
        }

        if (typeof e.stopImmediatePropagation === "function") {
          e.stopImmediatePropagation();
        }
      }
    };

    const listeners = computed(() => {
      return {
        blur: (e) => {
          cancelEvent(e);
          onBlur(e);
        },
      };
    });

    //Sự kiên blur ra ngoài ô input
    const onBlur = (e) => {
      validate();
    };

    return {
      errorMessage,
      validate,
      isValidate,
      listeners,
    };
  },
});
</script>

<template>
  <div class="m-input-container" :class="{ 'm-validate': isValidate }">
    <div v-if="label" class="m-label">{{ label }}</div>
    <textarea
      ref="TheInput"
      :class="['m-input', { 'm-input-error': errorMessage }]"
      :value="modelValue"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="onChangeHandler"
      v-on="listeners"
      :rows="rows"
    ></textarea>
    <div class="m-error-text" v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>
<style scoped>
@import url(@/css/components/TheInput.css);
</style>
