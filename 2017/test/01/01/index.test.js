const solution = require('../../../src/01/01');

const cases = [
    {
        input: '1122',
        output: 3
    },
    {
        input: '1111',
        output: 4
    },
    {
        input: '1234',
        output: 0
    },
    {
        input: '91212129',
        output: 9
    }
];

describe('Day 1, first puzzle', () => {
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
