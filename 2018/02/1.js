import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.trim());

const calcLetters = (input) => {
  const o = {};
  let has2 = 0;
  let has3 = 0;

  for (let i = 0; i < input.length; i++) {
    const l = input[i];
    if (!o[l]) {
      o[l] = 0;
    }
    o[l] += 1;
  }

  for (const key in o) {
    if (o[key] === 2) {
      has2 = 1;
    }
    if (o[key] === 3) {
      has3 = 1;
    }
  }

  return { has2, has3 };
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  let has2Tot = 0;
  let has3Tot = 0;

  parsedInput.forEach((line) => {
    const { has2, has3 } = calcLetters(line);
    has2Tot += has2;
    has3Tot += has3;
  });

  return has2Tot * has3Tot;
};

const tests = [
  {
    inp: `
abcdef
bababc
abbcde
abcccd
aabcdd
abcdee
ababab
`,
    out: 12,
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
