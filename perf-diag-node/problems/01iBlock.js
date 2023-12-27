module.exports = function blockLoop() {
  let s = +new Date();
  while (+new Date() - s < 2000) {
    "I block so much".split("").join("");
  }
  return "ok";
};
