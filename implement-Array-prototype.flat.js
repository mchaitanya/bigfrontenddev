// https://bigfrontend.dev/problem/implement-Array-prototype.flat/

/**
 * @param { Array } arr
 * @param { number } depth
 * @returns { Array }
 */
function flat(arr, depth = 1) {
  // depth should be >= 0.
  if (!Array.isArray(arr)) {
    return [arr];
  } else if (depth === 0) {
    return arr;
  }

  // Solve with recursion.
  const result = [];
  for (const e of arr) {
    result.push(...flat(e, depth - 1));
  }
  return result;
}
