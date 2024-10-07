const solution = require('../../../src/06/01');

const cases = [
    {
        input: `0	2	7	0`,
        output: 5
    }
];

describe('Day 6, first puzzle', () => {
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
