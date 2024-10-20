import Helpers from '../helpers.js';

const fileName = './input.txt';

const input = Helpers.readFile(fileName, import.meta.url);

const parseInput = (input) => input.trim().split('\n');

// https://www.reddit.com/r/adventofcode/comments/18pnycy/comment/kesv56w/
const getRockVelocity = (velocities) => {
	let possibleV = [];
	for (let x = -1000; x <= 1000; x++) {
		possibleV.push(x);
	}

	Object.keys(velocities).forEach((velocity) => {
		if (velocities[velocity].length < 2) {
			return;
		}

		let newPossibleV = [];
		possibleV.forEach((possible) => {
			if (
				(velocities[velocity][0] - velocities[velocity][1]) %
					(possible - velocity) ===
				0
			) {
				newPossibleV.push(possible);
			}
		});

		possibleV = newPossibleV;
	});

	return possibleV[0];
};

const calcSolution = (input) => {
	const parsedInput = parseInput(input);

	const hailstones = [];

	const velocitiesX = {};
	const velocitiesY = {};
	const velocitiesZ = {};

	for (const line of parsedInput) {
		const [positions, velocity] = line.split(' @ ');
		const [px, py, pz] = positions.split(', ').map((n) => Number(n));
		const [vx, vy, vz] = velocity.split(', ').map((n) => Number(n));

		if (!velocitiesX[vx]) {
			velocitiesX[vx] = [px];
		} else {
			velocitiesX[vx].push(px);
		}

		if (!velocitiesY[vy]) {
			velocitiesY[vy] = [py];
		} else {
			velocitiesY[vy].push(py);
		}

		if (!velocitiesZ[vz]) {
			velocitiesZ[vz] = [pz];
		} else {
			velocitiesZ[vz].push(pz);
		}

		hailstones.push({ px, py, pz, vx, vy, vz });
	}

	let possibleV = [];
	for (let x = -1000; x <= 1000; x++) {
		possibleV.push(x);
	}

	const rvx = getRockVelocity(velocitiesX);
	const rvy = getRockVelocity(velocitiesY);
	const rvz = getRockVelocity(velocitiesZ);

	const results = {};
	for (let i = 0; i < hailstones.length; i++) {
		for (let j = i + 1; j < hailstones.length; j++) {
			const stoneA = hailstones[i];
			const stoneB = hailstones[j];

			const ma = (stoneA.vy - rvy) / (stoneA.vx - rvx);
			const mb = (stoneB.vy - rvy) / (stoneB.vx - rvx);

			const ca = stoneA.py - ma * stoneA.px;
			const cb = stoneB.py - mb * stoneB.px;

			const rpx = parseInt((cb - ca) / (ma - mb));
			const rpy = parseInt(ma * rpx + ca);

			const time = Math.round((rpx - stoneA.px) / (stoneA.vx - rvx));
			const rpz = stoneA.pz + (stoneA.vz - rvz) * time;

			const result = rpx + rpy + rpz;
			if (!results[result]) {
				results[result] = 1;
			} else {
				results[result]++;
			}
		}
	}

	const result = Object.keys(results).sort(
		(a, b) => results[b] - results[a]
	)[0];

	return result;
};

console.log(calcSolution(input));
