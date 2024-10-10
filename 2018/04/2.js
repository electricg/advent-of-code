import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => {
  const regex = /\[([\d- ]+:([\d]+))\] ([\w ]+#?([\d]+)?(?:[\w ]+))/;
  return input
    .trim()
    .split('\n')
    .map((line) => {
      const matches = regex.exec(line);
      // console.log(matches);
      return {
        time: matches[1],
        minutes: Number(matches[2]),
        action: matches[3],
        id: Number(matches[4] || 0),
      };
    });
};

const sortByDate = (a, b) => {
  const valueA = a.time;
  const valueB = b.time;
  if (valueA < valueB) {
    return -1;
  }
  if (valueA > valueB) {
    return 1;
  }

  return 0;
};

const calcSolution = (input) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput);

  const logs = parsedInput.sort(sortByDate);
  // console.table(logs.slice(0, 10));

  const guards = {};
  let currentGuard;
  let start;

  logs.forEach((log) => {
    const { action, minutes, id } = log;
    if (action === 'falls asleep') {
      start = minutes;
    } else if (action === 'wakes up') {
      guards[currentGuard].total += minutes - start;
      for (let i = start; i < minutes; i++) {
        guards[currentGuard].ranges[i]++;
      }
    } else {
      currentGuard = id;
      if (!guards[currentGuard]) {
        guards[currentGuard] = {
          total: 0,
          ranges: new Array(60).fill(0),
        };
      }
    }
  });

  for (const id in guards) {
    guards[id].maxMin = Math.max(...guards[id].ranges);
  }

  const maxGuard = { id: 0, maxMin: 0 };

  for (const id in guards) {
    if (guards[id].maxMin > maxGuard.maxMin) {
      maxGuard.id = id;
      maxGuard.maxMin = guards[id].maxMin;
    }
  }
  const res = maxGuard.id * guards[maxGuard.id].ranges.indexOf(maxGuard.maxMin);

  return res;
};

const tests = [
  {
    inp: `
[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up
`,
    out: 4455,
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
