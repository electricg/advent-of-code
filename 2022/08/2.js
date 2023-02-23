import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split('').map((i) => i * 1));

const toTop = (grid, el, y, x) => {
  const start = y - 1;
  const end = 0;
  let res = 0;
  for (let row = start; row >= end; row--) {
    const current = grid[row][x];
    res++;
    if (current >= el) {
      return res;
    }
  }
  return res;
};

const toBottom = (grid, el, y, x) => {
  const start = y + 1;
  const end = grid.length;
  let res = 0;
  for (let row = start; row < end; row++) {
    const current = grid[row][x];
    res++;
    if (current >= el) {
      return res;
    }
  }
  return res;
};

const toLeft = (grid, el, y, x) => {
  const start = x - 1;
  const end = 0;
  let res = 0;
  for (let col = start; col >= end; col--) {
    const current = grid[y][col];
    res++;
    if (current >= el) {
      return res;
    }
  }
  return res;
};

const toRight = (grid, el, y, x) => {
  const start = x + 1;
  const end = grid[x].length;
  let res = 0;
  for (let col = start; col < end; col++) {
    const current = grid[y][col];
    res++;
    if (current >= el) {
      return res;
    }
  }
  return res;
};

const isVisible = (grid, y, x) => {
  if (y === 0 || x === 0) {
    return 0;
  }

  const el = grid[y][x];

  // console.log(
  //   toTop(grid, el, y, x),
  //   toBottom(grid, el, y, x),
  //   toLeft(grid, el, y, x),
  //   toRight(grid, el, y, x)
  // );

  return (
    toTop(grid, el, y, x) *
    toBottom(grid, el, y, x) *
    toLeft(grid, el, y, x) *
    toRight(grid, el, y, x)
  );
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);
  // console.log(isVisible(parsedInput, 3, 2));

  const res = [];

  for (let y = 0; y < parsedInput.length; y++) {
    for (let x = 0; x < parsedInput[y].length; x++) {
      res.push(isVisible(parsedInput, y, x));
    }
  }

  return Math.max(...res);
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
    out: 8,
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
