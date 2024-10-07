const solution = require('../../../src/02/01');

const cases = [
    {
        input: `5 1 9 5
7 5 3
2 4 6 8`,
        output: 18
    }
];

describe('Day 2, first puzzle', () => {
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
