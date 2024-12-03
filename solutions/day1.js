import { getInput } from "../utils.js";

const exampleInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

function formatInput(input) {
  const list1 = [];
  const list2 = [];

  input.forEach((row) => {
    const [item1, item2] = row.split("   ");
    list1.push(item1);
    list2.push(item2);
  });

  return [list1, list2];
}

function part1(input) {
  const [list1, list2] = formatInput(input);

  const sortedList1 = list1.sort();
  const sortedList2 = list2.sort();

  return sortedList1.reduce((acc, curr, i) => {
    const difference = Math.abs(curr - sortedList2[i]);

    return acc + difference;
  }, 0);
}

function part2(input) {
  const [list1, list2] = formatInput(input);

  const list2Map = list2.reduce((acc, curr) => {
    const key = Number(curr);
    const currentCount = Number(acc[curr]);
    return { ...acc, [key]: currentCount ? currentCount + 1 : 1 };
  }, {});

  return list1.reduce((acc, curr) => {
    const similarityScore = curr * (list2Map[curr] ?? 0);
    return acc + similarityScore;
  }, 0);
}

const input = getInput(1);
console.log(part1(input));
console.log(part2(input));
