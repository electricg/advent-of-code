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
  ['_', '_', '1', '_', '_'],
  ['_', '2', '3', '4', '_'],
  ['5', '6', '7', '8', '9'],
  ['_', 'A', 'B', 'C', '_'],
  ['_', '_', 'D', '_', '_'],
];

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const distances = {
    Y: 2,
    X: 0,
  };

  let res = '';

  let newY;
  let newX;

  parsedInput.forEach((line) => {
    line.forEach((l) => {
      newY = distances.Y + DIR[l].Y;
      newX = distances.X + DIR[l].X;

      if (newX < 0 || newX > 4) {
        return;
      }

      if (newY < 0 || newY > 4) {
        return;
      }

      if (PHONE[newY][newX] === '_') {
        return;
      }

      distances.Y = newY;
      distances.X = newX;
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
    out: '5DB3',
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
