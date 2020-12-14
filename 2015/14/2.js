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

const prepareData = input => input.map(item => {
    return {
        ...item,
        status: {
            mode: 'fly', // fly | rest
            timeLeft: item.flyTime,
            distance: 0,
            points: 0
        }
    };
});

const calcStep = item => {
    const { speed, flyTime, restTime, status } = item;
    status.timeLeft -= 1;
    if (status.mode === 'fly') {
        status.distance += speed;
    }
    if (status.timeLeft === 0) {
        if (status.mode === 'fly') {
            status.mode = 'rest';
            status.timeLeft = restTime;
        }
        else {
            status.mode = 'fly';
            status.timeLeft = flyTime;
            // console.log('FLYYYY', item.name, status.mode);
        }
    }
};

const givePoint = reindeers => {
    let maxDistance = 0;
    let winningReindeers = []; // indexes
    reindeers.forEach((reindeer, index) => {
        if (reindeer.status.distance === maxDistance) {
            winningReindeers.push(index);
        }
        else if (reindeer.status.distance > maxDistance) {
            maxDistance = reindeer.status.distance;
            winningReindeers = [index];
        }
    });
    winningReindeers.forEach(winner => {
        reindeers[winner].status.points += 1;
    });
};

const calcSolution = (input, endTimestamp) => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    const reindeers = prepareData(parsedInput);
    // console.log(reindeers);
    for (let i = 0; i < endTimestamp; i++) {
        reindeers.forEach(calcStep);
        givePoint(reindeers);
    }
    // console.log(reindeers);
    return Math.max(...reindeers.map(({ status }) => status.points));
};

const tests = [
    {
        inp: `
Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.
`,
        endTimestamp: 1000,
        // endTimestamp: 137,
        out: 689
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
