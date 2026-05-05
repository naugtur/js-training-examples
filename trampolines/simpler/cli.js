import { readFileSync, globSync } from "node:fs";
import { readFile, glob } from "node:fs/promises";
import { resolve } from "node:path";
import { makeScanner } from "./scan.js";

const pathToScan = resolve(process.argv[2] || ".");
console.log(`Scanning ${pathToScan}`);

const simpleGlob = async (pattern) => {
  // use glob inefficiently to simplify the example
  const results = [];
  for await (const entry of glob(pattern)) {
    results.push(entry);
  }
  return results;
};

const scanAsync = makeScanner({
  read: readFile,
  glob: simpleGlob,
});

const resultAsync = await scanAsync(pathToScan);
console.log("async result", resultAsync);

const scanSync = makeScanner({
  read: readFileSync,
  glob: globSync,
});

const resultSync = scanSync(pathToScan);
console.log("sync result", resultSync);
