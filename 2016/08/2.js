import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim().split('\n');

const print = (input) => input.map((b) => b.join('')).join('\n');

const doLine = (grid, input) => {
  const line = parseLine(input);
  if (line.action === 'rect') {
    doRect(grid, line);
  } else if (line.action === 'rotate') {
    doRotate(grid, line);
  }
  return grid;
};

const parseLine = (input) => {
  const [action, ...words] = input.split(' ');

  if (action === 'rect') {
    const [x, y] = words[0].split('x').map((i) => parseInt(i));
    return {
      action,
      x,
      y,
    };
  }
  if (action === 'rotate') {
    const dir = words.shift();
    const which = parseInt(words.shift().split('=').pop());
    const offset = parseInt(words.pop());
    return {
      action,
      dir,
      which,
      offset,
    };
  }
};

const doRect = (grid, { x, y }) => {
  // console.log('rect', x, y);
  for (let i = 0; i < y; i++) {
    for (let n = 0; n < x; n++) {
      grid[i][n] = '#';
    }
  }
};

const doRotate = (grid, { dir, which, offset }) => {
  // console.log(dir, which, offset);
  let copy = [];
  if (dir === 'row') {
    copy = [...grid[which]];
    const removed = copy.splice(-1 * offset, offset);
    copy.splice(0, 0, ...removed);
    grid[which] = [...copy];
  } else if (dir === 'column') {
    for (let i = 0; i < grid.length; i++) {
      copy.push(grid[i][which]);
    }
    const removed = copy.splice(-1 * offset, offset);
    copy.splice(0, 0, ...removed);
    for (let i = 0; i < grid.length; i++) {
      grid[i][which] = copy[i];
    }
  }
};

const createGrid = (x, y) =>
  new Array(y).fill().map(() => new Array(x).fill().map(() => '.'));

const calcSolution = (input, x = 50, y = 6) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const grid = createGrid(x, y);
  // console.log(print(grid));

  parsedInput.forEach((line) => {
    doLine(grid, line);
  });

  return print(grid); // AFBUPZBJPS
};

const tests = [
  {
    inp: 'rect 3x2',
    out: `
###....
###....
.......`,
  },
  {
    inp: 'rotate column x=1 by 1',
    out: `
#.#....
###....
.#.....`,
  },
  {
    inp: 'rotate row y=0 by 4',
    out: `
....#.#
###....
.#.....`,
  },
  {
    inp: 'rotate column x=1 by 1',
    out: `
.#..#.#
#.#....
.#.....`,
  },
];

let testGrid = createGrid(7, 3);
// console.log(print(testGrid));

tests.forEach(({ inp, out }) => {
  testGrid = doLine(testGrid, inp);
  const printedGrid = print(testGrid);
  // console.log(printedGrid);
  if (printedGrid === out.trim()) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

console.log(calcSolution(input));
