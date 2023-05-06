import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim().split('\n');

const hasABBA = (txt) => {
  const len = txt.length;
  for (let i = 0; i < len - 2; i++) {
    const a = txt[i];
    const b = txt[i + 1];

    if (a !== b && txt[i + 2] === b && txt[i + 3] === a) {
      return true;
    }
  }
  return false;
};

const isTLS = (input) => {
  const parsedInput = input.trim().replace(/[[\]]/g, ' ').split(' ');
  // console.log(parsedInput);
  let odd = false;
  let even = true;

  for (let i = 0; i < parsedInput.length; i++) {
    if (i % 2) {
      even = even && !hasABBA(parsedInput[i]);
    } else {
      odd = odd || hasABBA(parsedInput[i]);
    }
  }

  return odd && even;
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const res = parsedInput.filter((line) => isTLS(line));
  return res.length;
};

const tests = [
  {
    inp: 'abba[mnop]qrst',
    out: true,
  },
  {
    inp: 'abcd[bddb]xyyx',
    out: false,
  },
  {
    inp: 'aaaa[qwer]tyui',
    out: false,
  },
  {
    inp: 'ioxxoj[asdfgh]zxcvbn',
    out: true,
  },
];

tests.forEach(({ inp, out }) => {
  const res = isTLS(inp);
  if (res === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

console.log(calcSolution(input));
