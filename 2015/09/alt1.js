import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

var getMinDistance = (distances, remaining, lastCity = null) => {
    // console.log(remaining, lastCity);
    var minDistance = Infinity;
    for (let i = 0; i < remaining.length; i++) {
        let city = remaining[i],
            distance = lastCity != null ? distances[lastCity][city] : 0;

        if (remaining.length > 1)
            distance += getMinDistance(distances, [ ...remaining.slice(0, i), ...remaining.slice(i + 1) ], city);

        if (distance < minDistance)
            minDistance = distance;
    }

    return minDistance;
}

const calcSolution = input => {
    var cities = Array.from(new Set(input.split(/ = \d+\n| to /).slice(0, -1)));

    var distances = cities.reduce((obj, city) => Object.assign(obj, { [city]: {} }), {});

    input.slice(0,-1).split("\n").forEach(line => {
        let [ , source, destination, distance ] = line.match(/^(\w+) to (\w+) = (\d+)$/);

        distances[source][destination] =
            distances[destination][source] = +distance;
    });

    return getMinDistance(distances, cities);
};

const tests = [
    {
        inp: `London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141
`,
        out: 605
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