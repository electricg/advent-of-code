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

  const locations = {};

  block1: {
    for (let i = 0; i < parsedInput.length; i++) {
      const [d, n] = parsedInput[i];
      deg = deg + DIR[d];
      if (deg < 0) {
        deg = deg + 360;
      }
      if (deg >= 360) {
        deg = deg - 360;
      }

      for (let nn = 1; nn <= n; nn++) {
        distances[OBJ[deg].dir] += OBJ[deg].p;

        const p = `${distances.V}_${distances.H}`;

        if (locations[p] === undefined) {
          locations[p] = 0;
        }
        locations[p]++;

        if (locations[p] > 1) {
          break block1;
        }
      }
    }
  }
  // console.log(locations, distances);

  return Math.abs(distances.V) + Math.abs(distances.H);
};

const tests = [
  {
    inp: 'R8, R4, R4, R8',
    out: 4,
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
