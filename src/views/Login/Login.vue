<script>
import commonFn from "@/common/commonFn";
export default {
  props: {},
  mounted() {
    const $el = this.$el;
    this.$nextTick(() => {
      this.addObserveControl();
      // focus vào ô đầu tiên
      const firstInput = $el.querySelector(
        "input:not([disabled]), textarea:not([disabled])"
      );
      if (firstInput) {
        firstInput.focus();
      }
    });
  },
  methods: {
    /**
     * Lấy các control nhập liệu
     */
    addObserveControl() {
      const $el = this.$el;
      if (!this._observeControls) {
        this._observeControls = [];
        const $controls = $el.querySelectorAll(".m-validate");
        if ($controls && $controls.length > 0) {
          $controls.forEach((item) => {
            if (typeof item.getVueInstance === "function") {
              this._observeControls.push(item.getVueInstance());
            }
          });
        }
      }
    },

    validateComponents() {
      const me = this;
      if (me._observeControls && me._observeControls.length > 0) {
        let controls = me._observeControls.filter(
          (x) =>
            x.$el.offsetWidth ||
            x.$el.offsetHeight ||
            x.$el.getClientRects().length ||
            /** Xử lý validate control khi ẩn */
            (Array.isArray(x?.rules) && x.rules?.some((x) => x.hide))
        );
        if (controls.length > 0) {
          const errors = controls.map((x) => {
            if (typeof x.validate === "function") {
              return x.validate();
            }
            return "";
          });
          return !errors.some((x) => x);
        }
      }
      return true;
    },

    async onLoginClick() {
      this.validateComponents();
      if (!this.model.email || !this.model.password) {
        return;
      }
      try {
        const res = await this.$axios.post(`${this.module}/login`, this.model);
        if (res.status == 200) {
          this.isFalse = false;
          //Lưu vào localStorage
          localStorage.setItem("token", res.data);
          // Hiển thị thông báo đăng nhập thành công
          commonFn.toastSuccess("Đăng nhập thành công");
          // Chuyển hướng
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
        this.isFalse = true;
        setTimeout(() => {
          this.isFalse = false;
        }, 3000);
      }
    },
  },
  data() {
    return {
      model: {
        email: null,
        password: null,
      },
      module: "auth",
      isFalse: false,
    };
  },
};
</script>

<template>
  <div class="m-login">
    <div class="login-fail" v-if="isFalse">
      Số điện thoại/Email hoặc mật khẩu không đúng
    </div>
    <div class="grip-login">
      <div class="half-ctn left-grip">
        <span class="name-left-text">PHẦN MỀM QUẢN LÝ</span>
        <span class="name-left-text">HƠP ĐỒNG BẤT ĐỘNG SẢN</span>
      </div>
      <div class="half-ctn right-grip">
        <div class="main-login-ctn">
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
                  :rules="[{ name: 'required' }]"
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
                  :rules="[{ name: 'required' }]"
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
