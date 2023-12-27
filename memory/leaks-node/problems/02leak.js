const naiveCache = [];

module.exports = async function cacheAll(request) {
  naiveCache.push(request);
  return "ok";
};
