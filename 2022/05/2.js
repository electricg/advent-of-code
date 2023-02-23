import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => {
  const [starting, instructions] = input.split('\n\n');

  const parsedInstructions = instructions
    .trim()
    .split('\n')
    .map((line) => line.match(/(\d+)/g).map((i) => i * 1));

  const lines = starting.split('\n');
  const length = lines.pop().trim().split(/\s+/).length;
  const stack = Array(length)
    .fill()
    .map(() => []);

  lines.forEach((line) => {
    if (line === '') {
      return;
    }
    const res = line.match(/.{1,4}/g);
    res.forEach((item, i) => {
      const letter = item.match(/\w/);
      if (letter) {
        stack[i].unshift(letter[0]);
      }
    });
  });

  return {
    instructions: parsedInstructions,
    stack,
  };
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);
  const { instructions, stack } = parsedInput;

  instructions.forEach(([len, from, to]) => {
    var crate = stack[from - 1].splice(-1 * len);
    stack[to - 1].splice(stack[to - 1].length, 0, ...crate);
  });
  return stack.map((s) => s[s.length - 1]).join('');
};

const tests = [
  {
    inp: `
    [D]
[N] [C]
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`,
    out: 'MCD',
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
