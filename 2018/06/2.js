import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split(', ').map(Number));

const calcSolution = (input, manhattan) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const points = parsedInput;
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  let region = 0;

  for (let i = 0; i < points.length; i++) {
    const [x, y] = points[i];
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }

  // console.log(minX, maxX, minY, maxY);

  for (let y = minY - 1; y < maxY + 1; y++) {
    for (let x = minX - 1; x < maxX + 1; x++) {
      const distances = points.reduce(
        (acc, point) =>
          (acc += Math.abs(x - point[0]) + Math.abs(y - point[1])),
        0
      );
      if (distances < manhattan) {
        region++;
      }
    }
  }

  return region;
};

const tests = [
  {
    inp: `
1, 1
1, 6
8, 3
3, 4
5, 5
8, 9
`,
    manhattan: 32,
    out: 16,
  },
];

tests.forEach(({ inp, manhattan, out }) => {
  const res = calcSolution(inp, manhattan);
  if (res === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

console.log(calcSolution(input, 10000));
