<template>
  <div
    :class="['m-menu-wrapper', { active: isOptionShow }]"
    ref="wrapper"
    v-on:clickout="() => (isOptionShow = false)"
  >
    <slot name="toggle-button" :toggle="toggle"></slot>
    <Teleport to="body">
      <div
        v-if="isOptionShow"
        ref="dropdown"
        class="m-dropdown"
        :style="optionPos"
      >
        <ul>
          <!-- Slot for menu items -->
          <slot></slot>
        </ul>
      </div>
    </Teleport>
  </div>
</template>

<script>
import "clickout-event";
export default {
  name: "MenuWrapper",
  watch: {
    /**
     * Hiển thị Option list thì gán lại css
     * @param {*} newValue
     */
    isOptionShow: function (newValue) {
      if (newValue == true) {
        this.setOptionListPosition();
      }
    },
  },

  methods: {
    toggle() {
      this.isOptionShow = !this.isOptionShow;
    },

    /**
     * Lấy vị trí hiển thị
     */
    setOptionListPosition() {
      let wrapper = this.$refs.wrapper.getBoundingClientRect();
      this.$nextTick(() => {
        if (this.$refs.dropdown) {
          let dropdown = this.$refs.dropdown.getBoundingClientRect();
          if (dropdown) {
            this.optionPos = {
              left: wrapper.right - dropdown.width + "px",
              top: wrapper.bottom + "px",
            };
          }
        }
      });
    },
  },
  data() {
    return {
      isOptionShow: false,
      optionPos: {},
    };
  },
};
</script>

<style>
.m-dropdown {
  position: absolute;
  border-radius: 2.5px;
  background-color: #fff;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  overflow: auto;
  z-index: 9999;
  padding: 4px;
  min-width: 136px;
}
</style>
