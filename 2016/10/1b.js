import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const NOT_MINE = (input) => {
  let output = {};
  let COUNTER = 0;

  let bots = input
    .filter((value) => /^bo/.test(value))
    .map((str) => str.match(/(\d+).*?(output|bot) (\d+).*?(output|bot) (\d+)/))
    .map((matches) => ({
      bot: +matches[1],
      low: {
        dest: matches[2],
        value: +matches[3],
      },
      high: {
        dest: matches[4],
        value: +matches[5],
      },
      data: [],
    }))
    .map((bot) =>
      Object.assign(bot, {
        process(input) {
          COUNTER++;
          // console.log('process', input, COUNTER);
          bot.data.push(input);

          if (bot.data.length == 2) {
            let low = Math.min(...bot.data);
            let high = Math.max(...bot.data);

            bot.low.chip = low;
            bot.high.chip = high;
            bot.low.dest === 'output'
              ? (output[bot.low.value] = low)
              : bots[bot.low.value].process(low);
            bot.high.dest === 'output'
              ? (output[bot.high.value] = high)
              : bots[bot.high.value].process(high);
          }
        },
      })
    )
    .sort((a, b) => a.bot - b.bot);

  input
    .filter((value) => /^va/.test(value))
    .map((str) => str.match(/(\d+)/g))
    .map((matches) => ({
      value: +matches[0],
      bot: +matches[1],
    }))
    .forEach((value) => {
      bots[value.bot].process(value.value);
    });

  console.log('counter', COUNTER);
  // console.log(bots);
  // console.log(output);
  // return output[0] * output[1] * output[2];
  return {
    bots,
    output,
  };
};

const parseInput = (input) => input.trim().split('\n');

const calcSolution = (input, high, low) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);
  const done = NOT_MINE(parsedInput);
  const res = done.bots.find(
    (bot) => bot.low.chip === low && bot.high.chip === high
  );
  return res.bot;
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
