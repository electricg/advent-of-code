import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => {
  const regex = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;

  return input
    .trim()
    .split('\n')
    .map((line) => {
      const matches = regex.exec(line);
      return {
        id: Number(matches[1]),
        x: Number(matches[2]),
        y: Number(matches[3]),
        w: Number(matches[4]),
        h: Number(matches[5]),
      };
    });
};

// Overlap check
// https://www.reddit.com/r/adventofcode/comments/a2lesz/comment/eazgkm2/
const isOverlapping = (a, b) =>
  a.x < b.x + b.w && a.y < b.y + b.h && b.x < a.x + a.w && b.y < a.y + a.h;

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const claims = parsedInput;

  for (let a = 0; a < claims.length; ++a) {
    let intact = true;
    for (let b = 0; b < claims.length; ++b) {
      // same pointer
      if (a === b) {
        continue;
      }
      if (isOverlapping(claims[a], claims[b])) {
        intact = false;
        break;
      }
    }

    if (intact) {
      return claims[a].id;
    }
  }

  return 0;
};

const tests = [
  {
    inp: `
#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2
`,
    out: 3,
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
