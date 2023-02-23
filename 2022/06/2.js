import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim();

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);
  const n = 14;
  const len = parsedInput.length;
  for (let i = n - 1; i < len; i++) {
    if (new Set(parsedInput.substring(i - (n - 1), i + 1)).size === n) {
      return i + 1;
    }
  }
};

const tests = [
  {
    inp: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb',
    out: 19,
  },
  {
    inp: 'bvwbjplbgvbhsrlpgdmjqwftvncz',
    out: 23,
  },
  {
    inp: 'nppdvjthqldpwncqszvftbrmjlhg',
    out: 23,
  },
  {
    inp: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
    out: 29,
  },
  {
    inp: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
    out: 26,
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
