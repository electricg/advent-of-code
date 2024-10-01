import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => {
  return input
    .trim()
    .split('\n')
    .map((line) =>
      line
        .replace(',', '')
        .split(' ')
        .map((part) => {
          if (!isNaN(part)) {
            return Number(part);
          }
          return part;
        })
    );
};

const calcSolution = (input, start, which) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const instructions = parsedInput;

  const registers = start;

  let next = 0;

  while (instructions[next]) {
    const instruction = instructions[next];
    const [cmd, part2, part3] = instruction;

    if (cmd === 'hlf') {
      // console.log('hlf');
      registers[part2] = registers[part2] / 2;
      next++;
    } else if (cmd === 'tpl') {
      // console.log('tpl');
      registers[part2] = registers[part2] * 3;
      next++;
    } else if (cmd === 'inc') {
      // console.log('inc');
      registers[part2] = registers[part2] + 1;
      next++;
    } else if (cmd === 'jmp') {
      // console.log('jmp');
      next = next + part2;
    } else if (cmd === 'jie') {
      // console.log('jie');
      if (registers[part2] % 2 === 0) {
        next = next + part3;
      } else {
        next++;
      }
    } else if (cmd === 'jio') {
      // console.log('jio');
      if (registers[part2] === 1) {
        next = next + part3;
      } else {
        next++;
      }
    }
    // console.log('next', next);
  }

  // console.log(registers);
  return registers[which];
};

const tests = [
  {
    inp: `
inc a
jio a, +2
tpl a
inc a
`,
    which: 'a',
    start: {
      a: 0,
      b: 0,
    },
    out: 2,
  },
];

tests.forEach(({ inp, out, which, start }) => {
  const res = calcSolution(inp, start, which);
  if (res === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

console.log(calcSolution(input, { a: 1, b: 0 }, 'b'));
