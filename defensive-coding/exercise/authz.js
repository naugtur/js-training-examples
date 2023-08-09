// @ts-check

const { create } = Object;

export const makeAuthzManager = () => {
  const internals = create(null);
  internals.guessLimit = 2;
  internals.secrets = [];

  return {
    /**
     * Add a list of secrets to the manager
     *
     * @param {string[]} secrets
     */
    setSecrets: (secrets) => {
      internals.secrets = secrets;
    },
    /**
     * Make one attempt at guessing one of the secrets
     * @param {string} guess
     */
    guessSecret: (guess) => {
      if (internals.guessLimit <= 0) {
        throw new Error("Limit exceeded");
      }
      internals.guessLimit--;
      if (!internals.secrets.includes(guess)) {
        throw new Error("Unauthorized");
      }
    },
    /**
     * Make fetch requests authorised with respective secrets
     * (yes, it doesn't make much sense to depend on the order for matching secrets,
     * but you don't want to dig through tons of legacy code in your exercise examples
     * to avoid them being unrealistic, I hope)
     *
     * @param {Array<{ url:string, headers:Record<string, string>, method:string}>} requests
     */
    authorizedFetch: (requests) => {
      const authorizedRequests = Array.prototype.reduce.call(
        requests,
        (acc, request, index) => {
          const { url, headers, method } = request;
          const completeHeaders = {
            Authorization: "Bearer " + internals.secrets[index],
            ...headers,
          };
          acc[url] = {
            headers: completeHeaders,
            method,
          };
          return acc;
        },
        {}
      );
      return Promise.all(Object.keys(authorizedRequests).map(url => fetch(url, authorizedRequests[url])));
    },
  };
};
