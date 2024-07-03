import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => {
      const [dir, n] = line.split(' ');
      return [dir, n * 1];
    });

const moves = {
  R: {
    x: 1,
    y: 0,
  },
  L: {
    x: -1,
    y: 0,
  },
  U: {
    x: 0,
    y: 1,
  },
  D: {
    x: 0,
    y: -1,
  },
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const H = { x: 0, y: 0 };
  const T = { x: 0, y: 0 };

  const visitedByT = {};

  parsedInput.forEach(([dir, n]) => {
    // console.log(dir, n);
    for (let i = 0; i < n; i++) {
      H.x += moves[dir].x;
      H.y += moves[dir].y;

      const distX = H.x - T.x;
      const distY = H.y - T.y;

      let isDiagonal = false;

      if (Math.abs(distX * distY) === 2) {
        // diagonal
        isDiagonal = true;
      }

      if (distX > 1) {
        T.x += 1;
      } else if (distX < -1) {
        T.x += -1;
      }

      if (distY > 1) {
        T.y += 1;
      } else if (distY < -1) {
        T.y += -1;
      }

      if (isDiagonal) {
        if (distX === 1 || distX === -1) {
          T.x += distX;
        }
        if (distY === 1 || distY === -1) {
          T.y += distY;
        }
      }

      visitedByT[`${T.x}_${T.y}`] = 1;

      // console.log(dir, i, H, T, distX, distY);
    }
    // console.log('===');
  });
  // console.log(visitedByT);

  return Object.keys(visitedByT).length;
};

const tests = [
  {
    inp: `
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`,
    out: 13,
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
