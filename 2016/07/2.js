import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim().split('\n');

const isSSL = (input) => {
  const parsedInput = input.trim().replace(/[[\]]/g, ' ').split(' ');
  const supernets = [];
  const hypernets = [];

  for (let i = 0; i < parsedInput.length; i++) {
    if (i % 2) {
      hypernets.push(parsedInput[i]);
    } else {
      supernets.push(parsedInput[i]);
    }
  }

  for (let s = 0; s < supernets.length; s++) {
    const seq = supernets[s];
    for (let c = 0; c < seq.length - 2; c++) {
      if (seq[c] === seq[c + 2] && seq[c] !== seq[c + 1]) {
        const a = seq[c];
        const b = seq[c + 1];
        const bab = `${b}${a}${b}`;
        for (let h = 0; h < hypernets.length; h++) {
          if (hypernets[h].indexOf(bab) !== -1) {
            return true;
          }
        }
      }
    }
  }

  return false;
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const res = parsedInput.filter((line) => isSSL(line));
  return res.length;
};

const tests = [
  {
    inp: 'aba[bab]xyz',
    out: true,
  },
  {
    inp: 'xyx[xyx]xyx',
    out: false,
  },
  {
    inp: 'aaa[kek]eke',
    out: true,
  },
  {
    inp: 'zazbz[bzb]cdb',
    out: true,
  },
];

tests.forEach(({ inp, out }) => {
  const res = isSSL(inp);
  if (res === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

console.log(calcSolution(input));
