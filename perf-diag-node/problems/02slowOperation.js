const { stat } = require("fs/promises");
async function task() {
  await stat(`${Math.random().toFixed(5)}.txt`).catch(() => {});
}

module.exports = function promiseSomeWork() {
  return Promise.all(Array(1000).fill(0).map(task));
};
