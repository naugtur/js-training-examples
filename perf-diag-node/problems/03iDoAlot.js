"use strict";
const dns = require("dns");
const util = require("util");
const options = {
  family: 6,
  hints: dns.ADDRCONFIG | dns.V4MAPPED,
};
const lookup = util.promisify(dns.lookup);
// lookup(`example.com`, options).then(console.log)

const { stat } = require("fs/promises");

const datas = "abc".split("");
const cache = [];
async function task1(letter, depth) {
  await lookup(`${letter}${depth}.example.com`, options).catch(() => {});
  await exploreTree(depth - 1);
}
async function task2(letter, depth) {
  await stat(`${letter}${depth}.txt`).catch(() => {});
  await exploreTree(depth - 1);
}
async function task3(letter, depth) {
  await task1(letter, depth);
  await task2(letter, depth);
}

const tasks = [task1, task2, task3];

function exploreTree(depth = 0) {
  if (depth < 0) {
    return;
  }
  return Promise.all(
    datas.map((letter) => {
      cache.push(`${letter}${depth}`);
      return tasks[depth % tasks.length](letter, depth);
    })
  );
}

module.exports = async function promiseSomeWork() {
  await exploreTree(3);
  return "ok";
};
