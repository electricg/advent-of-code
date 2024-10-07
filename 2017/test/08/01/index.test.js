const solution = require('../../../src/08/01');

const isTrueCases = [
    {
        input: {
            comp: '==',
            left: 1,
            right: 1
        },
        output: true
    },
    {
        input: {
            comp: '==',
            left: 2,
            right: 1
        },
        output: false
    },
    {
        input: {
            comp: '!=',
            left: 2,
            right: 1
        },
        output: true
    },
    {
        input: {
            comp: '!=',
            left: 1,
            right: 1
        },
        output: false
    },
    {
        input: {
            comp: '<',
            left: 1,
            right: 2
        },
        output: true
    },
    {
        input: {
            comp: '<',
            left: 2,
            right: 1
        },
        output: false
    },
    {
        input: {
            comp: '<',
            left: 2,
            right: 2
        },
        output: false
    },
    {
        input: {
            comp: '<=',
            left: 1,
            right: 2
        },
        output: true
    },
    {
        input: {
            comp: '<=',
            left: 2,
            right: 1
        },
        output: false
    },
    {
        input: {
            comp: '<=',
            left: 2,
            right: 2
        },
        output: true
    },
    {
        input: {
            comp: '>',
            left: 1,
            right: 2
        },
        output: false
    },
    {
        input: {
            comp: '>',
            left: 2,
            right: 1
        },
        output: true
    },
    {
        input: {
            comp: '>',
            left: 2,
            right: 2
        },
        output: false
    },
    {
        input: {
            comp: '>=',
            left: 1,
            right: 2
        },
        output: false
    },
    {
        input: {
            comp: '>=',
            left: 2,
            right: 1
        },
        output: true
    },
    {
        input: {
            comp: '>=',
            left: 2,
            right: 2
        },
        output: true
    }
];

const cases = [
    {
        input: `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`,
        output: 1
    }
];

describe('Day 8, first puzzle', () => {
    describe('isTrue', () => {
        isTrueCases.forEach(kase => {
            it(`\`${kase.input.left} ${kase.input.comp} ${
                kase.input.right
            }\` should return \`${kase.output}\``, done => {
                const output = solution.isTrue(
                    kase.input.left,
                    kase.input.comp,
                    kase.input.right
                );
                output.should.deepEqual(kase.output);
                done();
            });
        });
    });

    describe('solution', () => {
        cases.forEach(kase => {
            it(`\`${kase.input}\` should return \`${kase.output}\``, done => {
                const output = solution.solution(kase.input);
                output.should.deepEqual(kase.output);
                done();
            });
        });

        it('should give me the solution', done => {
            const input = require('./input');
            const output = solution.solution(input);
            console.log(output);
            done();
        });
    });
});
