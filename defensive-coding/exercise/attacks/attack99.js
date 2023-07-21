// @ts-check

// this is an empty attack file for you to play with
// Pass 99 as attack number to the test to trigger this one

export const attack = (authzManager, success) => {
 
  // example calls:
  authzManager.guessSecret('wrong');
  authzManager.authorizedFetch([
    {
      url: "http://example.com",
      headers: {},
      method: "GET",
    },
  ]);

  // call success() with any reference that can be JSON.stringify-ed 
  // and the testrunner will check if you captured the secret
  
};
