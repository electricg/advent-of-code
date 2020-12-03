import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFileLinesNumbers(fileName, import.meta.url);

const calcFuel = mass => Math.floor(mass / 3) - 2;

const recursiveCalcFuel = (mass, totalFuel = 0) => {
    const fuel = calcFuel(mass);

    if (fuel > 0) {
        totalFuel += fuel;
        return recursiveCalcFuel(fuel, totalFuel);
    }

    return totalFuel;
};

const tests = [
    {
        mass: 14,
        fuel: 2
    },
    {
        mass: 1969,
        fuel: 966
    },
    {
        mass: 100756,
        fuel: 50346
    }
];

tests.forEach(({ mass, fuel }) => {
    const res = recursiveCalcFuel(mass);
    const isValid = res === fuel;
    if (isValid) {
        console.log(`✅ mass ${mass} fuel ${fuel} is ok`);
    }
    else {
        console.error(`❌ mass ${mass} fuel ${fuel} is wrong`);
    }
});

const totalFuel = input.reduce((acc, mass) => {
    acc += recursiveCalcFuel(mass);
    return acc;
}, 0);

console.log(totalFuel);
