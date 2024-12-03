import fs from "fs";

export function getInput(day) {
  return fs.readFileSync(`./inputs/day${day}.txt`, "utf8").split(/\r?\n/);
}
