const solution = require('../../../src/03/02');

const cases = [
    {
        input: 1,
        output: 2
    },
    {
        input: 2,
        output: 4
    },
    {
        input: 4,
        output: 5
    },
    {
        input: 5,
        output: 10
    },
    {
        input: 10,
        output: 11
    },
    {
        input: 11,
        output: 23
    },
    {
        input: 23,
        output: 25
    },
    {
        input: 25,
        output: 26
    },
    {
        input: 26,
        output: 54
    },
    {
        input: 54,
        output: 57
    },
    {
        input: 57,
        output: 59
    },
    {
        input: 59,
        output: 122
    },
    {
        input: 122,
        output: 133
    },
    {
        input: 133,
        output: 142
    },
    {
        input: 142,
        output: 147
    },
    {
        input: 147,
        output: 304
    },
    {
        input: 304,
        output: 330
    },
    {
        input: 330,
        output: 351
    },
    {
        input: 351,
        output: 362
    },
    {
        input: 362,
        output: 747
    },
    {
        input: 747,
        output: 806
    }
];

describe('Day 3, second puzzle', () => {
    cases.forEach(kase => {
        it(`\`${kase.input}\` should return \`${kase.output}\``, done => {
            const output = solution(kase.input);
            output.should.deepEqual(kase.output);
            done();
        });
    });

    it('should give me the solution', done => {
        const input = require('./input');
        const output = solution(input);
        console.log(output);
        done();
    });
});
