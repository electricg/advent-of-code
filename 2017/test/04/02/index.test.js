const solution = require('../../../src/04/02');

const cases = [
    {
        input: 'abcde fghij',
        output: true
    },
    {
        input: 'abcde xyz ecdab',
        output: false
    },
    {
        input: 'a ab abc abd abf abj',
        output: true
    },
    {
        input: 'iiii oiii ooii oooi oooo',
        output: true
    },
    {
        input: 'oiii ioii iioi iiio',
        output: false
    }
];

describe('Day 4, second puzzle', () => {
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
