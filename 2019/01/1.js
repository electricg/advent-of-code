import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFileLinesNumbers(fileName, import.meta.url);

const calcFuel = mass => Math.floor(mass / 3) - 2;

const tests = [
    {
        mass: 12,
        fuel: 2
    },
    {
        mass: 14,
        fuel: 2
    },
    {
        mass: 1969,
        fuel: 654
    },
    {
        mass: 100756,
        fuel: 33583
    }
];

tests.forEach(({ mass, fuel }) => {
    const res = calcFuel(mass);
    const isValid = res === fuel;
    if (isValid) {
        console.log(`✅ mass ${mass} fuel ${fuel} is ok`);
    }
    else {
        console.error(`❌ mass ${mass} fuel ${fuel} is wrong`);
    }
});

const totalFuel = input.reduce((acc, mass) => {
    acc += calcFuel(mass);
    return acc;
}, 0);

console.log(totalFuel);
