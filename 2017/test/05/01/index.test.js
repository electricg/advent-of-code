const solution = require('../../../src/05/01');

const cases = [
    {
        input: '2',
        output: 1
    },
    {
        input: `0
3
0
1
-3`,
        output: 5
    }
];

describe('Day 5, first puzzle', () => {
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
