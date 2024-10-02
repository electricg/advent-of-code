import md5 from 'md5';
import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim();

const getHash = (salt, index, hashes) => {
  if (!hashes[index]) {
    hashes[index] = md5(salt + index);
  }
  return hashes[index];
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const salt = parsedInput;
  const hashes = [];
  const keys = [];

  let index = 0;

  while (keys.length < 64) {
    const hash = getHash(salt, index, hashes);
    const match = hash.match(/(.)\1{2}/);
    if (match) {
      const char = match[1];
      for (let i = 1; i <= 1000; i++) {
        const h = getHash(salt, index + i, hashes);
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
    out: 22728,
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
