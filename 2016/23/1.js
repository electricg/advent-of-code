import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split(' '));

const calcSolution = (input, start) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);
  const len = parsedInput.length;
  let current = 0;

  const registers = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    ...start,
  };
  // console.log(registers);

  while (current < len) {
    const [what, x, y] = parsedInput[current];
    current++;
    // console.log(what, x, y);

    if (what === 'cpy') {
      if (registers[y] === undefined) {
        continue;
      }
      if (isNaN(x)) {
        if (registers[x] === undefined) {
          continue;
        }
        registers[y] = registers[x];
      } else {
        registers[y] = parseInt(x);
      }
    } else if (what === 'inc') {
      if (registers[x] === undefined) {
        continue;
      }
      registers[x]++;
    } else if (what === 'dec') {
      if (registers[x] === undefined) {
        continue;
      }
      registers[x]--;
    } else if (what === 'jnz') {
      const yN = isNaN(y) ? registers[y] : Number(y);
      if (registers[x] !== 0) {
        current += yN - 1;
      }
    } else if (what === 'tgl') {
      const instruction = parsedInput[registers[x] + current - 1];

      // If an attempt is made to toggle an instruction outside the program, nothing happens.
      if (!instruction) {
        continue;
      }

      // console.log(instruction);

      let newWhat = '';

      if (instruction[0] === 'inc') {
        // console.log('_inc');
        newWhat = 'dec';
      } else if (instruction[0] === 'dec' || instruction[0] === 'tgl') {
        // console.log('_not inc');
        newWhat = 'inc';
      } else if (instruction[0] === 'jnz') {
        // console.log('_jnz');
        newWhat = 'cpy';
      } else if (instruction[0] === 'cpy') {
        // console.log('_cpy');
        newWhat = 'jnz';
      }
      instruction[0] = newWhat;
      instruction.push(true); // marked as toggled
      // console.log(parsedInput);
      // return;
    }
  }

  return registers.a;
};

const tests = [
  {
    inp: `
cpy 2 a
tgl a
tgl a
tgl a
cpy 1 a
dec a
dec a
`,
    start: {},
    out: 3,
  },
];

tests.forEach(({ inp, start, out }) => {
  const res = calcSolution(inp, start);
  if (res === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

console.log(calcSolution(input, { a: 7 }));
// not 42
