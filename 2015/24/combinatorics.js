// https://github.com/jsantirso/js-combinatorics
/**
 * A generator of combinations of an array's elements
 * @param {Array} array Array to process
 * @param {Function} process Function to run for every combination
 * @param {Number} minCombLen Min length of the combination, not required
 * @param {Number} maxCombLen Max length of the combination, not required
 * @returns Nothing
 */
const processCombinations = function (array, process, minCombLen, maxCombLen) {
  // We initialize the default arguments
  minCombLen = minCombLen || 1;
  maxCombLen = maxCombLen || array.length;
  // Misc vars
  let arrayLen = array.length;
  // We loop through all the possible combination sizes (1..n)
  for (let combLen = minCombLen; combLen <= maxCombLen; combLen++) {
    // We initialize the pointers that will be used to generate the combinations
    // (0..n, as each of them points to a position in the array)
    let pointers = [];
    for (let i = 0; i < combLen; i++) pointers.push(i);
    // We will advance the pointers to generate the combinations of this size
    let finished = false; // A flag set to true when we have processed the current combination length
    while (!finished) {
      // We process the current combination
      let combination = [];
      for (let i = 0; i < combLen; i++) combination.push(array[pointers[i]]);
      if (process(combination) === false) return;
      // We find the first pointer that we can advance, starting from the right
      for (let pointer = combLen - 1; pointer >= 0; pointer--) {
        if (pointers[pointer] < arrayLen - (combLen - pointer)) {
          // We can advance it
          pointers[pointer] += 1;
          // We fix the next pointers
          for (
            let fixPointer = pointer + 1, i = 1;
            fixPointer < combLen;
            fixPointer++, i++
          ) {
            pointers[fixPointer] = pointers[pointer] + i;
          }
          break;
        } else {
          // We can't advance it.
          // If it was the leftmost one, we are done with this combination length
          if (!pointer) finished = true;
        }
      }
    }
  }
};

export default {
  processCombinations,
};
