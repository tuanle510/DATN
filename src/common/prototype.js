export default {
  install(app) {
    // Mở rộng Date.prototype
    Date.prototype.getDateOnly =
      Date.prototype.getDateOnly ||
      function () {
        let e = new Date(this);
        return new Date(e.setHours(0, 0, 0, 0));
      };
  },
};
