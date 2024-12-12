import fs from "fs";

export function getInput(day, split = true) {
  const file = fs.readFileSync(`./inputs/day${day}.txt`, "utf8");

  if (split) return file.split(/\r?\n/);
  return file;
}
