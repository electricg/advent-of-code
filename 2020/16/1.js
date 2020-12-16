import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = input => {
    const [criteria, myTicket, nearbyTickets] = input.trim().split('\n\n');

    const parsedCriteria = criteria.split('\n').reduce((acc, line) => {
        const [key, values] = line.split(/\s*:\s*/);
        const parsedValues = values.split(/\s*or\s*/).map(range => {
            const [min, max] = range.split('-');
            return {
                min: parseInt(min, 10),
                max: parseInt(max, 10)
            };
        });
        acc[key] = parsedValues;
        return acc;
    }, {});

    const parsedMyTicket = myTicket.split('\n').pop().split(',').map(n => parseInt(n, 10));

    const parsedNearbyTickets = nearbyTickets.split('\n').slice(1).map(ticket => ticket.split(',').map(n => parseInt(n, 10)));

    return {
        criteria: parsedCriteria,
        myTicket: parsedMyTicket,
        nearbyTickets: parsedNearbyTickets
    };
}

const getInvalidFields = (tickets, criteria) => {
    const criteriaKeys = Object.keys(criteria);
    const criteriaKeysLen = criteriaKeys.length;
    let invalidFields = [];

    tickets.forEach(ticket => {
        ticket.forEach(field => {
            let valid = false;

            loop:
            for (let i = 0; i < criteriaKeysLen; i++) {
                const crit = criteria[criteriaKeys[i]];
                for (let c = 0; c < crit.length; c++) {
                    const { min, max } = crit[c];
                    if (min <= field && field <= max) {
                        valid = true;
                        break loop;
                    }
                }
            }

            if (!valid) {
                invalidFields.push(field);
            }
        });
    });

    return invalidFields;
};

const calcSolution = input => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput.criteria);
    // console.log(parsedInput.nearbyTickets);
    const res = getInvalidFields(parsedInput.nearbyTickets, parsedInput.criteria);
    return res.reduce((acc, item) => acc += item, 0);
};

const tests = [
    {
        inp: `
class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12
`,
        out: 71
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
