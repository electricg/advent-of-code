import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.trim().split(' '));

const points = {
  X: 1, // rock       A
  Y: 2, // paper      B
  Z: 3, // scissors   C
};

const lost = 0;
const draw = 3;
const won = 6;

const wins = {
  X: {
    A: draw,
    B: lost,
    C: won,
  },
  Y: {
    A: won,
    B: draw,
    C: lost,
  },
  Z: {
    A: lost,
    B: won,
    C: draw,
  },
};

const calcScore = (you, me) => {
  return points[me] + wins[me][you];
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
    out: 15,
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
