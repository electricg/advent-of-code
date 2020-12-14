import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim().split('\n').map(line => {
    const words = line.split(' ');
    const [name,,, speed,,, flyTime] = words;
    const restTime = words[words.length - 2];

    return {
        name,
        speed: parseInt(speed, 10),
        flyTime: parseInt(flyTime, 10),
        restTime: parseInt(restTime, 10)
    };
});

const calcSolution = (input, endTimestamp) => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);

    const distances = parsedInput.map(({ name, speed, flyTime, restTime }) => {
        const cycle = flyTime + restTime;
        const numbersOfCycles = Math.floor(endTimestamp / cycle);
        const secondsLeft = endTimestamp % cycle;
        const secondsLeftLastFly = secondsLeft <= flyTime ? secondsLeft : flyTime;

        const totalDistance = speed * (flyTime * numbersOfCycles + secondsLeftLastFly);
        return totalDistance;
    });

    return Math.max(...distances);
};

const tests = [
    {
        inp: `
Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.
`,
        endTimestamp: 1000,
        out: 1120
    }
];

tests.forEach(({ inp, out, endTimestamp }) => {
    const res = calcSolution(inp, endTimestamp);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcSolution(input, 2503));
