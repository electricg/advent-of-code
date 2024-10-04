import md5 from 'md5';
import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim();

const isDoorOpen = (char) => 'bcdef'.includes(char);

const generateHash = (salt) => md5(salt);

const getHash = (salt, index, hashes) => {
  if (!hashes[index]) {
    hashes[index] = generateHash(salt + index);
  }
  return hashes[index];
};

const DIRS = [
  [0, -1, 'U'],
  [0, 1, 'D'],
  [-1, 0, 'L'],
  [1, 0, 'R'],
];

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const salt = parsedInput;
  const hashes = {};

  const start = [0, 0];
  const end = [3, 3];
  const queue = [];

  queue.push({ pos: start, steps: 0, path: '' });

  while (queue.length) {
    const {
      pos: [x, y],
      steps,
      path,
    } = queue.shift();

    const hash = getHash(salt, path, hashes);
    // console.log(hash, salt, path, steps);

    let i = 0;
    for (const [dx, dy, dd] of DIRS) {
      const isOpen = isDoorOpen(hash[i]);
      // console.log(dd, isOpen);
      i++;

      // door closed
      if (!isOpen) {
        continue;
      }

      const nx = x + dx;
      const ny = y + dy;

      // outside the map
      if (nx < 0 || nx > end[0] || ny < 0 || ny > end[1]) {
        continue;
      }

      // arrived at the end
      if (nx === end[0] && ny === end[1]) {
        return path + dd;
      }

      // door open
      queue.push({ pos: [nx, ny], steps: steps + 1, path: path + dd });
    }
  }

  return 0;
};

const tests = [
  {
    inp: 'ihgpwlah',
    out: 'DDRRRD',
  },
  {
    inp: 'kglvqrro',
    out: 'DDUDRLRRUDRD',
  },
  {
    inp: 'ulqzkmiv',
    out: 'DRURDRUDDLLDLUURRDULRLDUUDDDRR',
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
