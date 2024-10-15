import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split(', ').map(Number));

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const points = parsedInput;
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  const closest = {};
  const exclude = {};

  for (let i = 0; i < points.length; i++) {
    const [x, y] = points[i];
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
    closest[i] = 0;
  }

  // console.log(minX, maxX, minY, maxY);

  for (let y = minY - 1; y < maxY + 1; y++) {
    for (let x = minX - 1; x < maxX + 1; x++) {
      const distances = points.map(
        (point) => Math.abs(x - point[0]) + Math.abs(y - point[1])
      );
      const minDistance = Math.min(...distances);
      const minDistanceQt = distances.filter((d) => d === minDistance);
      if (minDistanceQt.length === 1) {
        const p = distances.indexOf(minDistance);
        closest[p] += 1;

        if (x === minX || x === maxX || y === minY || y === maxY) {
          exclude[p] = true;
        }
      }
    }
  }
  // console.log(closest);
  // console.log(exclude);

  Object.keys(exclude).forEach((key) => {
    delete closest[key];
  });

  // console.log(closest);

  const res = Math.max(...Object.values(closest));

  return res;
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
    out: 17,
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
