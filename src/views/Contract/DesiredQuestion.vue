<script>
import { ref, getCurrentInstance, defineComponent } from "vue";
import baseDetail from "@/views/baseDetail";
import { confirmYes } from "@/common/dialogFn";
export default defineComponent({
  extends: baseDetail,
  name: "ContractDetail",
  props: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const number = ref(null);
    const submitForm = () => {
      if (number.value > 31) {
        confirmYes(
          "Ngày không hợp lệ",
          "Giá trị ngày không thỏa mãn. Vui lòng đọc hướng dẫn và nhập lại."
        ).then((answer) => {
          if (answer) {
            // chả làm gì
          }
        });
        return;
      }
      if (
        proxy._formParam &&
        proxy._formParam.submit &&
        typeof proxy._formParam.submit === "function"
      ) {
        proxy._formParam.submit(number.value);
      }
      proxy.hide();
    };
    return {
      submitForm,
      number,
    };
  },
});
</script>

<template>
  <DynamicModal
    ref="ContactDetail"
    :title="'Thông báo'"
    class="desired-question"
    position="center"
    :height="'250px'"
    :width="'600px'"
    @beforeOpen="beforeOpen($event, close)"
    @beforeClose="beforeClose($event)"
    @opened="opened"
  >
    <template #content>
      <div class="desired-question-container">
        <div>
          Ngày trong tháng dự kiến cần thực hiện thanh toán, tính theo tháng đầu
          tiên của kỳ thanh toán
        </div>
        <div class="mes-text">
          Ví dụ, kỳ thanh toán là 3 tháng, từ 10/2/2019 tới 19/5/2019, nếu:
        </div>
        <div class="mes-text">
          - Ngày nhập là 14 thì ngày dự kiến thanh toán 14/2/2019.
        </div>
        <div class="mes-text">
          - Nếu ngày nhập là -2, thì ngày dự kiến là trước 2 ngày so với đầu kì,
          là 8/2/2019.
        </div>
        <TheNumber
          :rules="[{ name: 'required' }]"
          class="mt10"
          v-model="number"
          :format="'Number'"
        ></TheNumber>
      </div>
    </template>
    <template #footer>
      <div class="row-reverse" style="gap: 10px">
        <TheButton @click="submitForm()">Đồng ý</TheButton>
        <TheButton class="outline-button" @click="hide()">Đóng</TheButton>
      </div>
    </template>
  </DynamicModal>
</template>
<style lang="scss">
.desired-question {
  .mes-text {
    margin-top: 5px;
  }
  .mt10 {
    margin-top: 10px;
  }
}
</style>
