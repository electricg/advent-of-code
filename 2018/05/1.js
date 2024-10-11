import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim();

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const stack = [];

  parsedInput.split('').forEach((c) => {
    if (
      stack.length === 0 ||
      Math.abs(stack.at(-1).charCodeAt() - c.charCodeAt()) !== 32
    ) {
      stack.push(c);
    } else {
      stack.pop();
    }
  });

  return stack.length;
};

const tests = [
  {
    inp: 'dabAcCaCBAcCcaDA',
    out: 10,
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
