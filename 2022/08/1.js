import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split('').map((i) => i * 1));

const fromTop = (grid, y, x) => {
  const start = 0;
  const end = y;
  const group = [];
  for (let row = start; row < end; row++) {
    group.push(grid[row][x]);
  }
  return group;
};

const fromBottom = (grid, y, x) => {
  const start = y + 1;
  const end = grid.length;
  const group = [];
  for (let row = start; row < end; row++) {
    group.push(grid[row][x]);
  }
  return group;
};

const fromLeft = (grid, y, x) => {
  const start = 0;
  const end = x;
  const group = [];
  for (let col = start; col < end; col++) {
    group.push(grid[y][col]);
  }
  return group;
};

const fromRight = (grid, y, x) => {
  const start = x + 1;
  const end = grid[x].length;
  const group = [];
  for (let col = start; col < end; col++) {
    group.push(grid[y][col]);
  }
  return group;
};

const isVisible = (grid, y, x) => {
  if (y === 0 || x === 0) {
    return true;
  }

  const el = grid[y][x];

  const t = fromTop(grid, y, x);
  if (Math.max(...t) < el) {
    return true;
  }

  const b = fromBottom(grid, y, x);
  if (Math.max(...b) < el) {
    return true;
  }

  const l = fromLeft(grid, y, x);
  if (Math.max(...l) < el) {
    return true;
  }

  const r = fromRight(grid, y, x);
  if (Math.max(...r) < el) {
    return true;
  }

  return false;
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);
  // console.log(fromTop(parsedInput, 1, 3));
  // console.log(fromBottom(parsedInput, 1, 3));
  // console.log(fromLeft(parsedInput, 1, 3));
  // console.log(fromRight(parsedInput, 1, 3));
  // console.log(isVisible(parsedInput, 0, 4));

  let res = 0;

  for (let y = 0; y < parsedInput.length; y++) {
    for (let x = 0; x < parsedInput[y].length; x++) {
      if (isVisible(parsedInput, y, x)) {
        res++;
      }
    }
  }

  return res;
};

const tests = [
  {
    inp: `
30373
25512
65332
33549
35390
`,
    out: 21,
  },
];

tests.forEach(({ inp, out }) => {
  const res = calcSolution(inp);
  if (res === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

console.log(calcSolution(input));
