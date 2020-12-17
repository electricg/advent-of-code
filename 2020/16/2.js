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

const checkValueVsField = (value, field) => {
    const len = field.length;
    let valid = false;
    loop:
    for (let f = 0; f < len; f++) {
        const { min, max } = field[f];
        if (min <= value && value <= max) {
            valid = true;
            break loop;
        }
    }
    return valid;
}

const filterTickets = (tickets, criteria) => {
    const criteriaKeys = Object.keys(criteria);
    const criteriaKeysLen = criteriaKeys.length;

    return tickets.filter(ticket => {
        for (let f = 0; f < ticket.length; f++) {
            const field = ticket[f];
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
                return false;
            }
        }
        return true;
    });
};

const generateMyTicket = (validTickets, criteria, myTicket) => {
    const validTicketsLen = validTickets.length;
    const criteriaKeys = Object.keys(criteria);
    const availableFields = criteriaKeys.reduce((acc, key) => ({ ...acc, [key]: true }), {});

    const memo = myTicket.map((value, index) => {
        const possibleFields = criteriaKeys.filter(key => {
            const crit = criteria[key];

            if (!checkValueVsField(value, crit)) {
                return false;
            }
            
            for (let i = 0; i < validTicketsLen; i++) {
                if (!checkValueVsField(validTickets[i][index], crit)) {
                    return false;
                }
            }

            return true;
        });

        return possibleFields.reduce((acc, key) => ({ ...acc, [key]: true }), {});
    });

    // console.log(memo);
    // console.log(availableFields);
    const associate = {};

    while (Object.keys(availableFields).length) {
        memo.forEach((possibilities, index) => {
            const possibilitiesKeys = Object.keys(possibilities);
            const len = possibilitiesKeys.length;

            if (len === 0) {
                return;
            }

            if (len === 1) {
                const val = possibilitiesKeys.pop();
                delete possibilities[val];
                associate[index] = val;

                memo.forEach(m => {
                    delete m[val];
                });

                delete availableFields[val];

                return;
            }
        });
    }

    // console.log(memo);
    // console.log(associate);

    const ticket = Object.keys(associate).reduce((acc, index) => {
        const field = associate[index];
        const value = myTicket[index];
        acc[field] = value;
        return acc;
    }, {});

    return ticket;
};

const calcSolution = input => {
    const parsedInput = parseInput(input);
    // console.log(parsedInput.criteria);
    // console.log(parsedInput.myTicket);
    // console.log(parsedInput.nearbyTickets);
    const { criteria, myTicket, nearbyTickets } = parsedInput;
    const validTickets = filterTickets(nearbyTickets, criteria);
    // console.log(validTickets);

    const ticket = generateMyTicket(validTickets, criteria, myTicket);
    // console.log(ticket);
    return Object.keys(ticket).filter(key => key.indexOf('departure') === 0).reduce((acc, key) => {
        const value = ticket[key];
        return acc *= value;
    }, 1);
};

const testsFilter = [
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
        out: [ [ 7, 3, 47 ] ]
    }
];

testsFilter.forEach(({ inp, out }) => {
    const parsedInput = parseInput(inp);
    const res = filterTickets(parsedInput.nearbyTickets, parsedInput.criteria);
    if (JSON.stringify(res) === JSON.stringify(out)) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

const tests = [
    {
        inp: `
class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9
`,
        out: {
            row: 11,
            class: 12,
            seat: 13
        }
    }
];

tests.forEach(({ inp, out }) => {
    const parsedInput = parseInput(inp);
    const { criteria, myTicket, nearbyTickets } = parsedInput;
    const validTickets = filterTickets(nearbyTickets, criteria);
    const res = generateMyTicket(validTickets, criteria, myTicket);
    if (JSON.stringify(res) === JSON.stringify(out)) {
        console.log(`✅`);
    }
    else {
        console.error(`❌`);
    }
});

console.log(calcSolution(input));
