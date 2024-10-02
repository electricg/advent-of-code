import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim() * 1;

const calcTile = (x, y, favorite) => {
  const n = x * x + 3 * x + 2 * x * y + y + y * y + favorite;
  const bin = n.toString(2);
  const ones = bin.split('').filter((b) => b === '1').length;
  if (ones % 2 === 0) {
    return '.';
  }
  return '#';
};

const isTileEmpty = (x, y, favorite, map) => {
  // outside the building
  if (x < 0 || y < 0) {
    return false;
  }

  // tile has not been checked yet
  if (!map[x]?.[y]) {
    if (!map[x]) {
      map[x] = [];
    }
    // memorize tile in map
    map[x][y] = calcTile(x, y, favorite);
  }

  return map[x][y] === '.';
};

const DIRS = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const favorite = parsedInput;
  const start = [1, 1];

  const seen = {};
  const queue = [];

  let map = [];

  queue.push({ pos: start, steps: 0 });
  seen[`${start[0]}_${start[1]}`] = 1;

  while (queue.length) {
    const {
      pos: [x, y],
      steps,
    } = queue.shift();

    if (steps === 50) {
      return Object.keys(seen).length;
    }

    for (const [dx, dy] of DIRS) {
      const nx = x + dx;
      const ny = y + dy;

      // already traversed it
      if (seen[`${nx}_${ny}`]) {
        continue;
      }

      // if empty space
      if (isTileEmpty(nx, ny, favorite, map)) {
        queue.push({ pos: [nx, ny], steps: steps + 1 });
        seen[`${nx}_${ny}`] = 1;
      }
    }
  }

  return 0;
};

console.log(calcSolution(input));
