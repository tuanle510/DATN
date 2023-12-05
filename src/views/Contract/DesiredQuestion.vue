<script>
import { ref, getCurrentInstance, defineComponent } from "vue";
import baseDetail from "../baseDetail";

export default defineComponent({
  extends: baseDetail,
  name: "ContractDetail",
  props: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const model = ref(null);
    const submitForm = () => {
      if (
        proxy._formParam &&
        proxy._formParam.submit &&
        typeof proxy._formParam.submit === "function"
      ) {
        proxy._formParam.submit(model.value);
      }
      proxy.hide();
    };
    return {
      submitForm,
      model,
    };
  },
});
</script>

<template>
  <DynamicModal
    ref="ContactDetail"
    :title="'Thông báo'"
    class="contact-detail"
    position="center"
    @beforeOpen="beforeOpen($event, close)"
    @beforeClose="beforeClose($event)"
    @opened="opened"
  >
    <template #content>
      <div class="container-above">
        <div>
          <TheNumber v-model="model"></TheNumber>
        </div>
      </div>
    </template>
    <template #footer>
      <TheButton class="outline-button" @click="hide()">Đóng</TheButton>
      <TheButton @click="submitForm()">Cất</TheButton>
    </template>
  </DynamicModal>
</template>
<style lang="scss"></style>
