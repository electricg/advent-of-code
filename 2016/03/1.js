import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) =>
      line
        .trim()
        .split(/\s+/)
        .map((n) => parseInt(n))
    );

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const res = parsedInput.filter((item) => {
    const a = item[0] + item[1] > item[2];
    const b = item[0] + item[2] > item[1];
    const c = item[1] + item[2] > item[0];

    return a && b && c;
  });

  return res.length;
};

const tests = [
  {
    inp: '5 10 25',
    out: 0,
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
