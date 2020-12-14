import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => input.trim().split('\n').map(line => {
    const words = line.replace('.', '').split(' ');
    const subject = words.shift();
    const object = words.pop();
    const [, action, points] = words;

    return {
        subject,
        object,
        points: points * (action === 'lose' ? -1 : 1)
    };
});

const createData = input => input.reduce((acc, { subject, object, points }) => {
    if (!acc[subject]) {
        acc[subject] = {};
    }
    if (!acc[object]) {
        acc[object] = {};
    }
    if (acc[subject][object] == null) {
        acc[subject][object] = 0;
    }
    if (acc[object][subject] == null) {
        acc[object][subject] = 0;
    }
    acc[subject][object] += points;
    acc[object][subject] += points;
    return acc;
}, {});

const addMyself = input => {
    const myself = 'Giulia';
    const people = Object.keys(input);
    input[myself] = {};
    people.forEach(person => {
        input[person][myself] = 0;
        input[myself][person] = 0;
    });
    return input;
};

const createPeople = input => Object.keys(input);

const getMaxDistance = (data, remaining, firstItem = null, lastItem = null) => {
    let maxDistance = -Infinity;
    const len = remaining.length;

    for (let i = 0; i < len; i++) {
        const currentItem = remaining[i];
        if (lastItem == null) {
            // console.log('currentItem', currentItem);
            firstItem = currentItem;
        }
        let distance = lastItem != null ? data[lastItem][currentItem] : 0;

        if (len > 1) {
            distance += getMaxDistance(data, [ ...remaining.slice(0, i), ...remaining.slice(i + 1)], firstItem, currentItem);
        }
        else {
            // console.log('xxx', firstItem, currentItem);
            distance += data[currentItem][firstItem];
        }

        if (distance > maxDistance) {
            maxDistance = distance;
        }
    }

    return maxDistance;
};

const calcSolution = input => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput);
    const data = createData(parsedInput);
    // console.log(data);
    const dataWithMyself = addMyself(data);
    // console.log(dataWithMyself);
    const people = createPeople(data);
    // console.log(people);
    const maxD = getMaxDistance(data, people);
    // console.log(maxD);
    return maxD;
};

const tests = [
    {
        inp: `
Alice would gain 54 happiness units by sitting next to Bob.
Alice would lose 79 happiness units by sitting next to Carol.
Alice would lose 2 happiness units by sitting next to David.
Bob would gain 83 happiness units by sitting next to Alice.
Bob would lose 7 happiness units by sitting next to Carol.
Bob would lose 63 happiness units by sitting next to David.
Carol would lose 62 happiness units by sitting next to Alice.
Carol would gain 60 happiness units by sitting next to Bob.
Carol would gain 55 happiness units by sitting next to David.
David would gain 46 happiness units by sitting next to Alice.
David would lose 7 happiness units by sitting next to Bob.
David would gain 41 happiness units by sitting next to Carol.
`,
        out: 286
    }
];

tests.forEach(({ inp, out }) => {
    const res = calcSolution(inp);
    if (res === out) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcSolution(input));
