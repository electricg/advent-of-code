import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim();

const decompress = (input) => {
  let output = '';
  while (true) {
    const openPar = input.indexOf('(');
    if (openPar === -1) {
      output += input;
      return output;
    }

    output += input.slice(0, openPar);
    input = input.slice(openPar);
    // console.log(input, output);

    const closedPar = input.indexOf(')');
    if (closedPar === -1) {
      output += input;
      return output;
    }

    const marker = input.slice(openPar, closedPar).replace('(', '');
    const markers = marker.split('x').map((n) => parseInt(n));
    input = input.slice(closedPar + 1);
    // console.log(marker, markers, input, output);
    const repeated = new Array(markers[1])
      .fill(input.slice(0, markers[0]))
      .join('');
    output += repeated;
    input = input.slice(markers[0]);
    // console.log(input, output);
  }
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);
  return decompress(parsedInput).length;
};

const tests = [
  {
    inp: 'ADVENT',
    out: 'ADVENT',
  },
  {
    inp: 'A(1x5)BC',
    out: 'ABBBBBC',
  },
  {
    inp: '(3x3)XYZ',
    out: 'XYZXYZXYZ',
  },
  {
    inp: 'A(2x2)BCD(2x2)EFG',
    out: 'ABCBCDEFEFG',
  },
  {
    inp: '(6x1)(1x3)A',
    out: '(1x3)A',
  },
  {
    inp: 'X(8x2)(3x3)ABCY',
    out: 'X(3x3)ABC(3x3)ABCY',
  },
];

tests.forEach(({ inp, out }) => {
  const res = decompress(inp);
  if (res === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

console.log(calcSolution(input));
