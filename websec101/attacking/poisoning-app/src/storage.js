import { promises as fs } from "fs";
import { join } from "path";

const STORAGE_FILE = join(process.cwd(), "data.json");
const INIT_DATA = join(process.cwd(), ".initdata.json");

const initData = JSON.parse(await fs.readFile(INIT_DATA, "utf8"));

export const readData = async () => {
  try {
    return JSON.parse(await fs.readFile(STORAGE_FILE, "utf8"));
  } catch (err) {
    return initData;
  }
};

export const writeData = async (data) =>
  fs.writeFile(STORAGE_FILE, JSON.stringify(data, null, 2));
