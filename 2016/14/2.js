import md5 from 'md5';
import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim();

const getHash = (salt, index, hashes, repeat = 0) => {
  if (!hashes[index]) {
    hashes[index] = generateHash(salt + index, repeat);
  }
  return hashes[index];
};

const generateHash = (salt, repeat = 0) => {
  let hash = salt;
  for (let r = 0; r <= repeat; r++) {
    hash = md5(hash);
  }
  return hash;
};

const calcSolution = (input, repeat = 0) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const salt = parsedInput;
  const hashes = [];
  const keys = [];

  let index = 0;

  while (keys.length < 64) {
    const hash = getHash(salt, index, hashes, repeat);
    const match = hash.match(/(.)\1{2}/);
    if (match) {
      const char = match[1];
      for (let i = 1; i <= 1000; i++) {
        const h = getHash(salt, index + i, hashes, repeat);
        if (new RegExp(`${char}{5}`).test(h)) {
          keys.push([index, hash]);
          break;
        }
      }
    }
    index++;
  }

  return keys.at(-1)[0];
};

const tests = [
  {
    inp: `
abc
`,
    repeat: 0,
    out: 22728,
  },
  {
    inp: `
  abc
  `,
    repeat: 2016,
    out: 22551,
  },
];

tests.forEach(({ inp, repeat, out }) => {
  const res = calcSolution(inp, repeat);
  if (res === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

console.log(calcSolution(input, 2016));
