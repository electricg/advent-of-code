import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) =>
      line.replace(/[#@:]/g, '').replace(/[,x]/g, ' ').split(/\s+/).map(Number)
    );

const calcSolution = (input, size) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const grid = [];
  for (let i = 0; i < size[1]; i++) {
    grid.push(new Array(size[0]).fill(0));
  }
  // console.table(grid);

  for (let line = 0; line < parsedInput.length; line++) {
    const [, x, y, w, h] = parsedInput[line];
    for (let i = y; i < y + h; i++) {
      for (let j = x; j < x + w; j++) {
        grid[j][i]++;
      }
    }
  }
  // console.table(grid);

  const res = grid.reduce((acc, row) => {
    const c = row.filter((item) => item > 1).length;
    return (acc += c);
  }, 0);

  return res;
};

const tests = [
  {
    inp: `
#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2
`,
    size: [8, 8],
    out: 4,
  },
];

tests.forEach(({ inp, size, out }) => {
  const res = calcSolution(inp, size);
  if (res === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

console.log(calcSolution(input, [1000, 1000]));
