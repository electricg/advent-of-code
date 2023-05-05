import md5 from 'md5';
import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim();

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  let res = [];
  let chars = 0;
  let pos;

  let i = 0;
  while (chars < 8) {
    const output = md5(`${parsedInput}${i}`);
    if (output.indexOf('00000') === 0) {
      pos = parseInt(output[5]);
      // console.log('pos', pos);
      if (pos < 8 && res[pos] === undefined) {
        chars++;
        res[pos] = output[6];
      }
    }
    i++;
  }

  // console.log('res', res);

  return res.join('');
};

const tests = [
  {
    inp: 'abc',
    out: '05ace8e3',
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
