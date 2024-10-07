const solution = require('../../../src/01/02');

const cases = [
    {
        input: '1212',
        output: 6
    },
    {
        input: '1221',
        output: 0
    },
    {
        input: '123425',
        output: 4
    },
    {
        input: '123123',
        output: 12
    },
    {
        input: '12131415',
        output: 4
    }
];

describe('Day 1, second puzzle', () => {
    cases.forEach(kase => {
        it(`\`${kase.input}\` should return \`${kase.output}\``, done => {
            const output = solution(kase.input);
            output.should.equal(kase.output);
            done();
        });
    });

    it('should give me the solution', done => {
        const input = require('./input');
        const output = solution(input.data);
        console.log(output);
        done();
    });
});
