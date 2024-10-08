import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.trim());

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const len = parsedInput[0].length;
  let a;
  let b;

  for (let i = 0; i < parsedInput.length - 1; i++) {
    for (let j = i + 1; j < parsedInput.length; j++) {
      a = parsedInput[i];
      b = parsedInput[j];
      let diff = 0;
      let diffIndex;
      for (let c = 0; c < len; c++) {
        if (a[c] !== b[c]) {
          diff++;
          if (diff > 1) {
            break;
          }
          diffIndex = c;
        }
      }
      if (diff === 1) {
        // console.log(a, b, diffIndex);
        return a.slice(0, diffIndex) + a.slice(diffIndex + 1);
      }
    }
  }

  return false;
};

const tests = [
  {
    inp: `
abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz
`,
    out: 'fgij',
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
