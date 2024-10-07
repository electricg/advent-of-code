const solution = require('../../../src/02/02');

const cases = [
    {
        input: `5 9 2 8
9 4 7 3
3 8 6 5`,
        output: 9
    }
];

describe('Day 2, second puzzle', () => {
    cases.forEach(kase => {
        it(`\`${kase.input}\` should return \`${kase.output}\``, done => {
            const output = solution(kase.input);
            output.should.equal(kase.output);
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
