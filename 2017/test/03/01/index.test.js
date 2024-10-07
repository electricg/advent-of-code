const solution = require('../../../src/03/01');

const cases = [
    {
        input: 1,
        output: 0
    },
    {
        input: 12,
        output: 3
    },
    {
        input: 23,
        output: 2
    },
    {
        input: 1024,
        output: 31
    }
];
const corners = [
    {
        input: [2, 9],
        output: [5, 3, 9, 7]
    },
    {
        input: [10, 25],
        output: [17, 13, 25, 21]
    },
    {
        input: [26, 49],
        output: [37, 31, 49, 43]
    },
    {
        input: [50, 81],
        output: [65, 57, 81, 73]
    },
    {
        input: [82, 121],
        output: [101, 91, 121, 111]
    }
];
const coordinates = [
    {
        input: 10,
        output: [2, 1]
    },
    {
        input: 14,
        output: [1, -2]
    },
    {
        input: 18,
        output: [-2, -1]
    },
    {
        input: 22,
        output: [-1, 2]
    }
];

describe('Day 3, first puzzle', () => {
    describe('getCorners', () => {
        corners.forEach(kase => {
            for (let input = kase.input[0]; input <= kase.input[1]; input++) {
                it(`\`${input}\` should return \`${kase.output}\``, done => {
                    const output = solution.getCorners(input);
                    output.should.deepEqual(kase.output);
                    done();
                });
            }
        });
    });

    describe('getCoordinates', () => {
        coordinates.forEach(kase => {
            it(`\`${kase.input}\` should return \`${kase.output}\``, done => {
                const output = solution.getCoordinates(kase.input);
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
