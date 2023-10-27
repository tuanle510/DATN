class commonFn {
  findLoading() {
    const el = document.getElementById("mloading");
    return el;
  }
  mask() {
    const el = this.findLoading();
    if (el) {
      el.style.visibility = "visible";
    }
  }
  unMask() {
    const el = this.findLoading();
    if (el) {
      el.style.visibility = "hidden";
    }
  }
}
export default new commonFn();
