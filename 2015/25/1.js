import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => {
  const regex = /(\d+)[,a-zA-Z ]+(\d+)/g;
  const matches = regex.exec(input);
  return {
    row: Number(matches[1]),
    column: Number(matches[2]),
  };
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const { row, column } = parsedInput;

  let code = 20151125;
  let x = 1;
  let y = 1;
  while (x !== row || y !== column) {
    code = (code * 252533) % 33554393;

    if (x === 1) {
      x = y + 1;
      y = 1;
    } else {
      y++;
      x--;
    }
  }

  return code;
};

console.log(calcSolution(input));
