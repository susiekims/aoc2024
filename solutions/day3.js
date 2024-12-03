import { getInput } from "../utils.js";

const exampleInput =
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
const exampleInput2 =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

const regex = /mul\((-?\d+),(-?\d+)\)|do\(\)|don't\(\)/g;

function getMatches(input, checkForConditionals = false) {
  let match;
  let matches = [];

  do {
    match = regex.exec(input);
    if (match) {
      if (match[1] && match[2]) {
        matches.push([match[1], match[2]]);
      } else if (checkForConditionals) {
        matches.push(match[0] === "do()" ? true : false);
      }
    }
  } while (match);

  return matches;
}

function part1(input) {
  const matches = getMatches(input);
  return matches.reduce((acc, [a, b]) => {
    return acc + a * b;
  }, 0);
}

function part2(input) {
  const matches = getMatches(input, true);
  let enabled = true;

  return matches.reduce((acc, curr) => {
    if (typeof curr === "boolean") {
      enabled = curr;
    } else if (enabled) {
      return acc + curr[0] * curr[1];
    }

    return acc;
  }, 0);
}

const input = getInput(3);
console.log(part1(input));
console.log(part2(input));
