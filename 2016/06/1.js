import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split(''));

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const res = Helpers.arrayOfObj(parsedInput[0].length);
  parsedInput.forEach((line) => {
    line.forEach((char, charIndex) => {
      if (res[charIndex][char] === undefined) {
        res[charIndex][char] = 0;
      }
      res[charIndex][char]++;
    });
  });

  const res2 = res
    .map((item) =>
      Object.entries(item).sort((a, b) => {
        return b[1] - a[1];
      })
    )
    .map((item) => item[0][0])
    .join('');
  // console.log(res2);

  return res2;
};

const tests = [
  {
    inp: `
eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar
`,
    out: 'easter',
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
