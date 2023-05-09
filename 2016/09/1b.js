import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim();

const decompress = (input) => {
  let count = 0;
  while (true) {
    const openPar = input.indexOf('(');
    if (openPar === -1) {
      count += input.length;
      return count;
    }

    count += input.slice(0, openPar).length;
    input = input.slice(openPar);
    // console.log(input, count);

    const closedPar = input.indexOf(')');
    if (closedPar === -1) {
      count += input.length;
      return count;
    }

    const marker = input.slice(openPar, closedPar).replace('(', '');
    const markers = marker.split('x').map((n) => parseInt(n));
    input = input.slice(closedPar + 1);
    // console.log(marker, markers, input, count);
    const toRepeat = input.slice(0, markers[0]);
    const repeated = markers[1] * toRepeat.length;
    count += repeated;
    input = input.slice(markers[0]);
    // console.log(input, count);
  }
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);
  return decompress(parsedInput);
};

const tests = [
  {
    inp: 'ADVENT',
    out: 'ADVENT'.length,
  },
  {
    inp: 'A(1x5)BC',
    out: 'ABBBBBC'.length,
  },
  {
    inp: '(3x3)XYZ',
    out: 'XYZXYZXYZ'.length,
  },
  {
    inp: 'A(2x2)BCD(2x2)EFG',
    out: 'ABCBCDEFEFG'.length,
  },
  {
    inp: '(6x1)(1x3)A',
    out: '(1x3)A'.length,
  },
  {
    inp: 'X(8x2)(3x3)ABCY',
    out: 'X(3x3)ABC(3x3)ABCY'.length,
  },
  {
    inp: input,
    out: 112830,
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

// console.log(calcSolution(input));
