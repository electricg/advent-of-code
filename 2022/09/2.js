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

  const tailsN = 9;
  const ROPE = [];

  for (let i = 0; i <= tailsN; i++) {
    ROPE[i] = { x: 0, y: 0 };
  }
  // console.log(ROPE);

  const visitedByT = {};

  parsedInput.forEach(([dir, n]) => {
    // console.log(dir, n);
    for (let i = 0; i < n; i++) {
      // head
      ROPE[0].x += moves[dir].x;
      ROPE[0].y += moves[dir].y;

      // tails
      for (let r = 1; r <= tailsN; r++) {
        const currentTail = ROPE[r];
        const distX = ROPE[r - 1].x - currentTail.x;
        const distY = ROPE[r - 1].y - currentTail.y;

        let isDiagonal = false;

        if (Math.abs(distX * distY) === 2) {
          // diagonal
          isDiagonal = true;
        }

        if (distX > 1) {
          currentTail.x += 1;
        } else if (distX < -1) {
          currentTail.x += -1;
        }

        if (distY > 1) {
          currentTail.y += 1;
        } else if (distY < -1) {
          currentTail.y += -1;
        }

        if (isDiagonal) {
          if (distX === 1 || distX === -1) {
            currentTail.x += distX;
          }
          if (distY === 1 || distY === -1) {
            currentTail.y += distY;
          }
        }
      }

      // last tail
      visitedByT[`${ROPE[tailsN].x}_${ROPE[tailsN].y}`] = 1;

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
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
`,
    out: 36,
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
