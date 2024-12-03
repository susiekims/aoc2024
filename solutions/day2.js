import { getInput } from "../utils.js";

const exampleInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`.split(/\r?\n/);

function isReportSafe(report) {
  let prev = report[0];
  let increasingOrDecreasing =
    report[1] - report[0] >= 0 ? "increasing" : "decreasing";

  for (let i = 1; i < report.length; i++) {
    const level = report[i];
    const difference = prev - level;

    if (Math.abs(difference) > 3 || difference == 0) {
      return false;
    }

    const currentTrend = difference < 0 ? "increasing" : "decreasing";
    if (currentTrend === increasingOrDecreasing) {
      prev = level;
    } else {
      return false;
    }
  }

  return true;
}

function part1(input) {
  const reports = input.map((level) => level.split(" "));

  return reports.reduce((acc, curr) => {
    return isReportSafe(curr) ? acc + 1 : acc;
  }, 0);
}

function part2(input) {
  const reports = input.map((level) => level.split(" "));

  return reports.reduce((acc, report) => {
    if (isReportSafe(report)) {
      return acc + 1;
    }

    const isSafeAfterRemovingItem = report.some((_level, i) => {
      const reportCopy = [...report];
      reportCopy.splice(i, 1);
      return isReportSafe(reportCopy);
    });

    return isSafeAfterRemovingItem ? acc + 1 : acc;
  }, 0);
}

const input = getInput(2);

console.log(part1(input));
console.log(part2(input));
