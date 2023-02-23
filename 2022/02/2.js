import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.trim().split(' '));

const points = {
  X: 0, // lose
  Y: 3, // draw
  Z: 6, // won
  A: 1, // rock
  B: 2, // paper
  C: 3, // scissors
};

const wins = {
  X: {
    A: 'C',
    B: 'A',
    C: 'B',
  },
  Y: {
    A: 'A',
    B: 'B',
    C: 'C',
  },
  Z: {
    A: 'B',
    B: 'C',
    C: 'A',
  },
};

const calcScore = (you, me) => {
  return points[me] + points[wins[me][you]];
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);
  return parsedInput.reduce((acc, round) => (acc += calcScore(...round)), 0);
};

const tests = [
  {
    inp: `
A Y
B X
C Z
`,
    out: 12,
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
