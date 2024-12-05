import { getInput } from "../utils.js";

const exampleInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`.split(/\r?\n/);

const north = [
  [0, 1],
  [0, 2],
  [0, 3],
];

const northEast = [
  [1, 1],
  [2, 2],
  [3, 3],
];

const east = [
  [1, 0],
  [2, 0],
  [3, 0],
];

const southEast = [
  [1, -1],
  [2, -2],
  [3, -3],
];

const south = [
  [0, -1],
  [0, -2],
  [0, -3],
];

const southWest = [
  [-1, -1],
  [-2, -2],
  [-3, -3],
];

const west = [
  [-1, 0],
  [-2, 0],
  [-3, 0],
];

const northWest = [
  [-1, 1],
  [-2, 2],
  [-3, 3],
];

const DIRECTIONS = [
  north,
  northEast,
  east,
  southEast,
  south,
  southWest,
  west,
  northWest,
];

/*
S.S
.A.
M.M
*/
const topLeft = [
  [-1, 1],
  [1, 1],
  [1, -1],
  [-1, -1],
];

/* 
M.S
.A.
M.S
*/
const topRight = [
  [1, 1],
  [1, -1],
  [-1, -1],
  [-1, 1],
];

/* 
M.M
.A.
S.S
*/
const bottomLeft = [
  [1, -1],
  [-1, -1],
  [-1, 1],
  [1, 1],
];

/*
S.M
.A.
S.M
*/
const bottomRight = [
  [-1, -1],
  [-1, 1],
  [1, 1],
  [1, -1],
];

const DIRECTIONS_2 = [topLeft, topRight, bottomLeft, bottomRight];

function countMatchingWords(currentPosition, matrix, directions, wordToFind) {
  const [currentX, currentY] = currentPosition;

  return directions.reduce((acc, direction) => {
    const word = direction
      .map(
        ([x, y]) =>
          (matrix[y + currentY] && matrix[y + currentY][x + currentX]) ?? ""
      )
      .join("");

    return word === wordToFind ? acc + 1 : acc;
  }, 0);
}

function part1(input) {
  const matrix = input.map((line) => line.split(""));

  return matrix.reduce((acc, row, y) => {
    const matchesPerRow = row.reduce((acc, letter, x) => {
      if (letter === "X") {
        const matchesPerPosition = countMatchingWords(
          [x, y],
          matrix,
          DIRECTIONS,
          "MAS"
        );
        return acc + matchesPerPosition;
      }
      return acc;
    }, 0);

    return acc + matchesPerRow;
  }, 0);
}

function part2(input) {
  const matrix = input.map((line) => line.split(""));

  return matrix.reduce((acc, row, y) => {
    const matchesPerRow = row.reduce((acc, letter, x) => {
      if (letter === "A") {
        const matchesPerPosition = countMatchingWords(
          [x, y],
          matrix,
          DIRECTIONS_2,
          "SSMM"
        );
        return acc + matchesPerPosition;
      }
      return acc;
    }, 0);

    return acc + matchesPerRow;
  }, 0);
}

const input = getInput(4);
console.log(part1(input));
console.log(part2(input));
