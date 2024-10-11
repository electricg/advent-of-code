import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim();

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const alpha = 'abcdefghijklmnopqrstuvwxyz';

  const lens = alpha.split('').map((a) => {
    const txt = parsedInput.replace(new RegExp(a, 'gi'), '');
    const stack = [];

    txt.split('').forEach((c) => {
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
  });

  return Math.min(...lens);
};

const tests = [
  {
    inp: 'dabAcCaCBAcCcaDA',
    out: 4,
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
