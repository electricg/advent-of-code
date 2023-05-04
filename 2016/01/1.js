import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split(', ')
    .map((item) => {
      const [a, ...b] = item;
      return [a, parseInt(b.join(''))];
    });

const OBJ = {
  0: {
    dir: 'V',
    p: 1,
  },
  90: {
    dir: 'H',
    p: 1,
  },
  180: {
    dir: 'V',
    p: -1,
  },
  270: {
    dir: 'H',
    p: -1,
  },
};
const DIR = {
  L: -90,
  R: 90,
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const distances = {
    V: 0,
    H: 0,
  };
  let deg = 0;

  parsedInput.forEach(([d, n], i) => {
    deg = deg + DIR[d];
    if (deg < 0) {
      deg = deg + 360;
    }
    if (deg >= 360) {
      deg = deg - 360;
    }
    distances[OBJ[deg].dir] += OBJ[deg].p * n;
  });

  return Math.abs(distances.V) + Math.abs(distances.H);
};

const tests = [
  {
    inp: 'R2, L3',
    out: 5,
  },
  {
    inp: 'R2, R2, R2',
    out: 2,
  },
  {
    inp: 'R5, L5, R5, R3',
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
