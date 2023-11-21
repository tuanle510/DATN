class commonFn {
  findLoading() {
    const el = document.getElementById("mloading");
    return el;
  }
  mask() {
    const el = this.findLoading();
    if (el) {
      el.style.display = "flex";
    }
  }
  unMask() {
    const el = this.findLoading();
    if (el) {
      el.style.display = "none";
    }
  }

  checkDiff(obj1, obj2) {
    const replacer = (key, value) => (value === null ? "" : value);

    const json1 = JSON.stringify(obj1, replacer);
    const json2 = JSON.stringify(obj2, replacer);

    return json1 !== json2;
  }
}
export default new commonFn();
