import { getInput } from "../utils.js";

const exampleInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`.split(/\n\n/);

function isUpdateCorrectOrder(update, rules) {
  return rules.every(([before, after]) => {
    const beforeIndex = update.indexOf(before);
    const afterIndex = update.indexOf(after);

    if (beforeIndex > -1 && afterIndex > -1) {
      return beforeIndex < afterIndex;
    }
    return true;
  });
}

// 97,13,75,29,47
function fixOrder(update, rules) {
  const orderedUpdate = [...update];

  rules.forEach(([before, after]) => {
    const beforeIndex = orderedUpdate.indexOf(before);
    const afterIndex = orderedUpdate.indexOf(after);

    console.log({ before, beforeIndex, after, afterIndex });

    if (beforeIndex > -1 && afterIndex > -1 && beforeIndex > afterIndex) {
      orderedUpdate[beforeIndex] = after;
      orderedUpdate[afterIndex] = before;
    }
    console.log(orderedUpdate);
  });

  return orderedUpdate;
}

function part1(input) {
  const rules = input[0].split(/\n/).map((rule) => rule.split("|"));
  const updates = input[1].split(/\n/);

  return updates.reduce((acc, update) => {
    const updateArr = update.split(",");
    const correct = isUpdateCorrectOrder(updateArr, rules);

    if (correct) {
      const middleNumber = updateArr[(updateArr.length - 1) / 2];
      return acc + Number(middleNumber);
    }
    return acc;
  }, 0);
}

function part2(input) {
  const rules = input[0].split(/\n/).map((rule) => rule.split("|"));
  const updates = input[1].split(/\n/);

  return updates.reduce((acc, update) => {
    const updateArr = update.split(",");
    const correct = isUpdateCorrectOrder(updateArr, rules);

    if (!correct) {
      let fixedUpdate = fixOrder(updateArr, rules);
      while (isUpdateCorrectOrder(fixedUpdate, rules) === false) {
        fixedUpdate = fixOrder(fixedUpdate, rules);
      }
      const middleNumber = fixedUpdate[(fixedUpdate.length - 1) / 2];
      console.log(fixedUpdate, middleNumber);
      return acc + Number(middleNumber);
    }
    return acc;
  }, 0);
}

const input = getInput(5, false).split(/\n\n/);
console.log(part1(input));
console.log(part2(input));
