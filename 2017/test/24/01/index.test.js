const solution = require('../../../src/24/01');

const cases = [
    {
        input: `0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`,
        output: 31
    }
];

describe('Day 24, first puzzle', () => {
    cases.forEach(kase => {
        it(`\`${kase.input}\` should return \`${kase.output}\``, done => {
            const output = solution(kase.input);
            // output.should.deepEqual(kase.output);
            done();
        });
    });

    // it('should give me the solution', done => {
    //     const input = require('./input');
    //     const output = solution(input);
    //     console.log(output);
    //     done();
    // });
});
