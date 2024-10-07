const solution = require('../../../src/04/01');

const cases = [
    {
        input: 'aa bb cc dd ee',
        output: true
    },
    {
        input: 'aa bb cc dd aa',
        output: false
    },
    {
        input: 'aa bb cc dd aaa',
        output: true
    }
];

describe('Day 4, first puzzle', () => {
    cases.forEach(kase => {
        it(`\`${kase.input}\` should return \`${kase.output}\``, done => {
            const output = solution(kase.input);
            output.should.deepEqual(kase.output);
            done();
        });
    });

    it('should give me the solution', done => {
        const input = require('./input');
        const lines = input.split('\n');
        const valids = lines.filter(line => {
            return solution(line);
        });
        console.log(valids.length);
        done();
    });
});
