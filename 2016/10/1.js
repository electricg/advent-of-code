import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const Bot = function (id) {
  this.id = id;
  this.values = [];
  this.high = {
    value: undefined,
    destinationType: undefined,
    destinationId: undefined,
  };
  this.low = {
    value: undefined,
    destinationType: undefined,
    destinationId: undefined,
  };

  this.addValue = function (value, bots, output) {
    this.values.push(value);
    if (this.values.length === 2) {
      this.values.sort(Helpers.compareNumbers);

      this.low.value = this.values[0];
      this.high.value = this.values[1];

      for (let what of ['low', 'high']) {
        const current = this[what];
        if (current.destinationType === 'output') {
          output[current.destinationId] = current.value;
        } else if (current.destinationType === 'bot') {
          if (!bots[current.destinationId]) {
            bots[current.destinationId] = new Bot(current.destinationId);
          }
          bots[current.destinationId].addValue(current.value, bots, output);
        }
      }
    }
  };

  this.give = function (what, destinationType, destinationId, bots, output) {
    const current = this[what];
    current.destinationType = destinationType;
    current.destinationId = destinationId;

    if (current.value !== undefined) {
      if (!bots[current.destinationId]) {
        bots[current.destinationId] = new Bot(current.destinationId);
      }
      bots[current.destinationId].addValue(current.value, bots, output);
    }
  };
};

const parseInput = (input) =>
  input
    .trim()
    .split('\n')
    .map((line) => line.split(' '));

const runInstructions = (instructions) => {
  const bots = {};
  const output = {};

  instructions.forEach((line) => {
    if (line[0] === 'bot') {
      const botId = parseInt(line[1]);
      const lowId = parseInt(line[6]);
      const highId = parseInt(line[11]);
      const lowWhat = line[5];
      const highWhat = line[10];

      if (!bots[botId]) {
        bots[botId] = new Bot(botId);
      }

      bots[botId].give('low', lowWhat, lowId, bots, output);
      bots[botId].give('high', highWhat, highId, bots, output);
    } else if (line[0] === 'value') {
      const value = parseInt(line[1]);
      const botId = parseInt(line[5]);
      if (!bots[botId]) {
        bots[botId] = new Bot(botId);
      }
      bots[botId].addValue(value, bots, output);
    }
  });

  // console.log(bots);
  // console.log(output);

  return {
    bots,
    output,
  };
};

const calcSolution = (input, findHigh, findLow) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const { bots } = runInstructions(parsedInput);

  const res = Object.keys(bots).filter((id) => {
    return (
      bots[id].values.indexOf(findHigh) !== -1 &&
      bots[id].values.indexOf(findLow) !== -1
    );
  });
  return parseInt(res.pop());
};

const tests = [
  {
    inp: {
      instructions: `
value 5 goes to bot 2
bot 2 gives low to bot 1 and high to bot 0
value 3 goes to bot 1
bot 1 gives low to output 1 and high to bot 0
bot 0 gives low to output 2 and high to output 0
value 2 goes to bot 2`,
      high: 5,
      low: 2,
    },
    out: 2,
  },
];

tests.forEach(({ inp, out }) => {
  const res = calcSolution(inp.instructions, inp.high, inp.low);
  if (res === out) {
    console.log(`✅`);
  } else {
    console.error(`❌`);
  }
});

console.log(calcSolution(input, 61, 17));
