<script>
import commonFn from "@/common/commonFn";
export default {
  props: {},
  methods: {
    async onLoginClick() {
      try {
        const res = await this.$axios.post(`${this.module}/login`, this.model);
        if (res.status == 200) {
          //Lưu vào localStorage
          localStorage.setItem("token", res.data);
          // Hiển thị thông báo đăng nhập thành công
          commonFn.toastSuccess("Đăng nhập thành công");
          // Chuyển hướng
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      model: {
        email: "string",
        password: "string",
      },
      module: "auth",
    };
  },
};
</script>

<template>
  <div class="m-login">
    <div class="grip-login">
      <div class="half-ctn left-grip">
        <span class="name-left-text">PHẦN MỀM QUẢN LÝ</span>
        <span class="name-left-text">HƠP ĐỒNG BẤT ĐỘNG SẢN</span>
      </div>
      <div class="half-ctn right-grip">
        <div class="main-login-ctn">
          <!-- <div class="logo"></div> -->
          <div class="logo-text">
            Đăng nhập để làm việc với <b>HOUSING MGNT</b>
          </div>

          <div id="normal-login">
            <div class="grid-login-normal">
              <div class="username-login">
                <TheInput
                  id="iptUserName"
                  class="input-login"
                  placeholder="Username, email hoặc số điện thoại"
                  v-model="this.model.email"
                />
              </div>
              <div class="password-login">
                <TheInput
                  autocomplete
                  id="iptPassword"
                  type="password"
                  placeholder="Mật khẩu"
                  class="input-login"
                  v-model="this.model.password"
                />
                <div class="eye on-eye"></div>
              </div>

              <div class="button-login" style="margin-top: 20px">
                <button class="button" @click.prevent="onLoginClick" id="login">
                  Đăng nhập
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
@import url(../../css/login.css);
</style>
