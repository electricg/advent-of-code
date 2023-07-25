import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => parseInt(input.trim());

/**
 * Check if a coordinate is a wall
 * @param {number} x x coordinate
 * @param {number} y y coordinate
 * @param {number} favorite office designer's favorite number (your puzzle input)
 * @returns {boolean} true if it's a wall
 */
const isWall = (x, y, favorite) => {
  const sum = x * x + 3 * x + 2 * x * y + y + y * y + favorite;
  const binary = sum.toString(2);
  return binary.split('').filter((i) => i === '1').length % 2 === 1;
};

/**
 *
 * @param {number[]} param width & height of the maze
 * @param {number} favorite office designer's favorite number (your puzzle input)
 * @returns
 */
const buildMaze = ([width, height], favorite) => {
  const maze = [];

  for (let y = 0; y < height; y++) {
    const line = [];
    for (let x = 0; x < width; x++) {
      const c = isWall(x, y, favorite);
      const item = c ? 0 : 1; // 0 is wall, 1 is open space
      line.push(item);
    }
    maze.push(line);
  }

  return maze;
};

// 0 = '#' wall | 1 = '.' open space | 2 = 'O' route
const printMaze = (maze) => {
  let output = '  ';
  const w = maze[0].length;
  const obj = ['#', '.', 'O'];

  for (let x = 0; x < w; x++) {
    output += x;
  }
  for (let y = 0; y < maze.length; y++) {
    output += `\n${y} `;
    for (let x = 0; x < w; x++) {
      output += obj[maze[y][x]];
    }
  }

  return output;
};

const calcSolution = (input, size, end) => {
  const favorite = parseInput(input);
  const maze = buildMaze(size, favorite);
  console.log(printMaze(maze));
  const start = [1, 1];

  return favorite;
};

const testsMaze = [
  {
    inp: [[10, 7], 10],
    out: `  0123456789
0 .#.####.##
1 ..#..#...#
2 #....##...
3 ###.#.###.
4 .##..#..#.
5 ..##....#.
6 #...##.###`,
  },
];

testsMaze.forEach(({ inp, out }) => {
  const res = printMaze(buildMaze(...inp));
  if (res === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

const tests = [
  {
    inp: ['10', [10, 7], [7, 4]],
    out: 11,
  },
];

tests.forEach(({ inp, out }) => {
  const res = calcSolution(...inp);
  if (res === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

// console.log(calcSolution(input, [55, 55], [31, 39]));
