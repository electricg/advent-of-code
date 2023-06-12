import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split(' '));

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);
  const len = parsedInput.length;
  let current = 0;

  const registers = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
  };

  while (current < len) {
    const [what, x, y] = parsedInput[current];
    // console.log(what, x, y);

    if (what === 'cpy') {
      if (isNaN(x)) {
        registers[y] = registers[x];
      } else {
        registers[y] = parseInt(x);
      }
      current++;
    }

    if (what === 'inc') {
      registers[x]++;
      current++;
    }

    if (what === 'dec') {
      registers[x]--;
      current++;
    }

    if (what === 'jnz') {
      // console.log(registers[x]);
      if (registers[x] !== 0) {
        current += parseInt(y);
      } else {
        current++;
      }
    }
  }

  return registers.a;
};

const tests = [
  {
    inp: `
cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`,
    out: 42,
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
