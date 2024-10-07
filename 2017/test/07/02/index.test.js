const solution = require('../../../src/07/02');

const cases = [
    {
        input: `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`,
        output: 60
    }
];

describe('Day 7, second puzzle', () => {
    cases.forEach(kase => {
        it(`should return \`${kase.output}\``, done => {
            const output = solution(kase.input);
            // console.log(JSON.stringify(output, null, 2));
            output.should.deepEqual(kase.output);
            done();
        });
    });

    it('should give me the solution', done => {
        const input = require('./input');
        const output = solution(input);
        console.log(output);
        // console.log(JSON.stringify(output, null, 2));
        done();
    });
});
