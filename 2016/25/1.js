import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split(' '));

const checkOutput = (output) => {
  if (!output.length) {
    return false;
  }

  if (output.join('').match(/[2-9]/)) {
    return false;
  }

  for (let i = 1; i < output.length - 1; i++) {
    if (output[i] === output[i - 1] || output[i] === output[i + 1]) {
      return false;
    }
  }

  return true;
};

const calcSolution = (input, start) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);
  let current = 0;
  let counter = 0;

  const output = [];

  const registers = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    ...start,
  };
  // console.log(registers);

  while (counter < 100000) {
    counter++;
    const [what, x, y] = parsedInput[current];
    current++;
    // console.log(current, what, x, y);

    if (what === 'cpy') {
      const xN = isNaN(x) ? registers[x] : Number(x);
      registers[y] = xN;
    } else if (what === 'inc') {
      registers[x]++;
    } else if (what === 'dec') {
      registers[x]--;
    } else if (what === 'jnz') {
      const xN = isNaN(x) ? registers[x] : Number(x);
      const yN = isNaN(y) ? registers[y] : Number(y);
      if (xN !== 0) {
        current += yN - 1;
      }
    } else if (what === 'out') {
      const xN = isNaN(x) ? registers[x] : Number(x);
      output.push(xN);
    }
  }

  if (checkOutput(output)) {
    return true;
  }

  return false;
};

const calcSolutionFinal = (input) => {
  for (let i = 0; i < 10000; i++) {
    const res = calcSolution(input, { a: i });
    if (res) {
      return i;
    }
  }
};

console.log(calcSolutionFinal(input));
