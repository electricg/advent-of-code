import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split('-').map(Number));

const calcSolution = (input, start) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const sorted = parsedInput.sort((a, b) => {
    const diff = a[0] - b[0];

    if (diff !== 0) {
      return diff;
    }

    return a[1] - b[1];
  });

  // console.log(sorted);

  let min = start[0];

  for (let i = 0; i < sorted.length; i++) {
    const range = sorted[i];
    if (min < range[0]) {
      return min;
    }
    if (min < range[1]) {
      min = range[1] + 1;
    }
    // console.log(min);
  }

  return min;
};

const tests = [
  {
    inp: `
5-8
0-2
4-7
`,
    start: [0, 9],
    out: 3,
  },
];

tests.forEach(({ inp, start, out }) => {
  const res = calcSolution(inp, start);
  if (res === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

console.log(calcSolution(input, [0, 4294967295]));
