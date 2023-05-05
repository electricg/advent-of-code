import md5 from 'md5';
import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim();

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  let res = '';
  let chars = 0;

  let i = 0;
  while (chars < 8) {
    const output = md5(`${parsedInput}${i}`);
    if (output.indexOf('00000') === 0) {
      chars++;
      res += output[5];
    }
    i++;
  }

  return res;
};

const tests = [
  {
    inp: 'abc',
    out: '18f47a30',
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
