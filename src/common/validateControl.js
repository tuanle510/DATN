import { ref, getCurrentInstance, computed } from "vue";

export const useValidateControl = ({ props }) => {
  const errorMessage = ref("");
  const isValidate = computed(() => props.rules.length > 0);
  const { proxy } = getCurrentInstance();
  const validate = () => {
    let rules = [];
    rules = props.rules;
    let message = "";
    if (Array.isArray(rules) && rules.length > 0) {
      for (let index = 0; index < rules.length; index++) {
        const rule = rules[index];
        if (rule) {
          const { name } = rule;
          const controlValue = getValueControl();
          message = handlerRule(name, controlValue);
          if (message) {
            break;
          }
        }
      }
    }
    errorMessage.value = message;
    return message;
  };
  /**
   * Xử lý các rule validate
   * @param {*} rule tên rule
   * @param {*} compareValue value
   * @returns
   */
  const handlerRule = (rule, controlValue) => {
    let message = "";

    switch (rule) {
      case "required":
        if (
          controlValue === undefined ||
          controlValue === null ||
          controlValue === NaN ||
          controlValue === ""
        ) {
          message = "Không được để trống";
        }
        break;
      default:
        break;
    }
    return message;
  };

  const clearValidate = () => {
    errorMessage.value = "";
  };
  /**
   * Lấy value của control (Các control override hàm này)
   * @returns
   */
  const getValueControl = () => {
    debugger;
    return proxy.modelValue;
  };

  return {
    errorMessage,
    validate,
    clearValidate,
    isValidate,
  };
};
