import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split(''));

const DIR = {
  U: {
    X: 0,
    Y: -1,
  },
  D: {
    X: 0,
    Y: 1,
  },
  L: {
    X: -1,
    Y: 0,
  },
  R: {
    X: 1,
    Y: 0,
  },
};

const PHONE = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const distances = {
    X: 1,
    Y: 1,
  };

  let res = '';

  parsedInput.forEach((line) => {
    line.forEach((l) => {
      distances.X += DIR[l].X;
      distances.Y += DIR[l].Y;

      if (distances.X < 0) {
        distances.X = 0;
      }

      if (distances.X > 2) {
        distances.X = 2;
      }

      if (distances.Y < 0) {
        distances.Y = 0;
      }

      if (distances.Y > 2) {
        distances.Y = 2;
      }
    });

    res += PHONE[distances.Y][distances.X];
  });

  return res;
};

const tests = [
  {
    inp: `
ULL
RRDDD
LURDL
UUUUD
`,
    out: '1985',
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
