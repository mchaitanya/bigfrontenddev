// https://bigfrontend.dev/problem/support-negative-Array-index/

/**
 * @param {any[]} arr
 * @returns {?} - sorry no type hint for this
 */
function wrap(arr) {
  return new Proxy(arr, {
    get(target, key) {
      let keyNumeric = Number(key);
      if (isNaN(keyNumeric) || keyNumeric >= 0) {
        return target[key];
      } else {
        return target[target.length + keyNumeric];
      }
    },
  });
}

const originalArr = [1, 2, 3];
const arr = wrap(originalArr);

console.log(arr[-1]);
