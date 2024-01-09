<script>
import { defineComponent } from "vue";
import { DialogWrapper } from "vue3-promise-dialog";

export default defineComponent({
  components: {
    DialogWrapper,
  },
  setup() {
    return {};
  },
});
</script>

<template>
  <div>
    <RouterView></RouterView>
    <!-- <MainLayout></MainLayout> -->
    <ModalsContainer />
    <TheLoading id="mloading"></TheLoading>
    <DialogWrapper />
  </div>
</template>

<style></style>
