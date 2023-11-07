const uuid = require("uuid");

class Dashboard {
  constructor() {
    this.id = uuid.v1();
  }
}

const dashboard = (function () {
  let instance;

  function createInstance() {
    let dashboardInstance = new Dashboard();
    return dashboardInstance;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

module.exports = dashboard;
