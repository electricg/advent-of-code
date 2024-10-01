const split = (value, group) => {
	const newArr = [];

	const [valueStart, valueEnd] = value;
	const [groupStart, groupEnd] = group;

	// 1 - Completely before
	if (valueEnd < groupStart) {
		console.log('Completely before');
		newArr.push([valueStart, valueEnd]);
	}
	// 2 - Completely after
	else if (valueStart > groupEnd) {
		console.log('Completely after');
		newArr.push([valueStart, valueEnd]);
	}
	// 3 - Completely inside
	else if (valueStart >= groupStart && valueEnd <= groupEnd) {
		console.log('Completely inside');
		newArr.push([valueStart, valueEnd]);
	}
	// 4 - Start before, end inside
	else if (valueStart < groupStart && valueEnd <= groupEnd) {
		console.log('Start before, end inside');
		newArr.push([valueStart, groupStart - 1]);
		newArr.push([groupStart, valueEnd]);
	}
	// 5 - Start inside, end after
	else if (valueStart >= groupStart && valueEnd > groupEnd) {
		console.log('Start inside, end after');
		newArr.push([valueStart, groupEnd]);
		newArr.push([groupEnd + 1, valueEnd]);
	}
	// 6 - Start before, end after
	else if (valueStart < groupStart && valueEnd > groupEnd) {
		console.log('Start before, end after');
		newArr.push([valueStart, groupStart - 1]);
		newArr.push([groupStart, groupEnd]);
		newArr.push([groupEnd + 1, valueEnd]);
	}

	// console.log(newArr);
	return newArr;
};

// split([5, 8], [9, 10]);
// console.log('=================================================');

// split([5, 8], [1, 4]);
// console.log('=================================================');

// split([5, 8], [5, 8]);
// split([5, 8], [4, 9]);
// console.log('=================================================');

// split([5, 8], [6, 10]);
// split([5, 8], [6, 8]);
// split([5, 8], [7, 10]);
// console.log('=================================================');

// split([5, 8], [4, 7]);
// split([5, 8], [5, 7]);
// split([5, 8], [4, 6]);
// console.log('=================================================');

// split([1, 9], [3, 7]);

const split2 = (value, groups) => {
	const newArr = [];

	// const [valueStart, valueEnd] = value;

	groups.forEach((group) => {
		// const [groupStart, groupEnd] = group;
		const arr = split(value, group);
		console.log(arr);
	});
};

split2(
	[10, 20],
	[
		[2, 4],
		[8, 10],
		[12, 15],
		[19, 30],
	]
);
