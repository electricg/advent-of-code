import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

import ka from './karger.js';

const parseInput = (input) =>
	input
		.trim()
		.split('\n')
		.map((line) => line.replace(':', '').split(' '));

const parseGraph = (input) => {
	const nodes = [];
	const edges = [];
	const indexes = {};

	input.forEach((line) => {
		line.forEach((item) => {
			if (indexes[item] === undefined) {
				indexes[item] = nodes.length;
				nodes.push(item);
			}
		});

		for (let i = 1; i < line.length; i++) {
			edges.push([indexes[line[0]], indexes[line[i]]]);
		}
	});
	return { nodes, edges };
};

const calcSolution = (input) => {
	const parsedInput = parseInput(input);
	// console.log(parsedInput);

	const graph = parseGraph(parsedInput);
	const { nodes, edges } = graph;
	// console.log(nodes, edges);

	const V = nodes.length;
	const E = edges.length;
	const g = new ka.Graph(V, E);
	g.edge = edges.map(([u, v]) => new ka.Edge(u, v));

	let k = 0;
	let cutedges;
	let components;
	while (k < 100) {
		k++;
		// not really using `r`, just to avoid any sort of caching or memoization
		const r = Math.random();
		[cutedges, components] = ka.kargerMinCut(g, r);
		if (cutedges === 3) {
			break;
		}
		// didn't find the result, search again
		if (k === 100 && r !== 3) {
			k = 0;
		}
	}

	const list = {};
	components.forEach((c) => {
		if (!list[c]) {
			list[c] = 0;
		}
		list[c]++;
	});

	const res = Object.values(list).reduce((acc, n) => (acc *= n), 1);

	return res;
};

const tests = [
	{
		inp: `
jqt: rhn xhk nvd
rsh: frs pzl lsr
xhk: hfx
cmg: qnr nvd lhk bvb
rhn: xhk bvb hfx
bvb: xhk hfx
pzl: lsr hfx nvd
qnr: nvd
ntq: jqt hfx bvb xhk
nvd: lhk
lsr: lhk
rzs: qnr cmg lsr rsh
frs: qnr lhk lsr
`,
		out: 54,
	},
];

tests.forEach(({ inp, out }) => {
	const res = calcSolution(inp);
	if (res === out) {
		console.log(`✅`);
	} else {
		console.error(`❌`);
	}
});

console.log(calcSolution(input));
