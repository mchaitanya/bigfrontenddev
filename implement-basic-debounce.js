// https://bigfrontend.dev/problem/implement-basic-debounce/

// https://lodash.com/docs/4.17.15#debounce
// Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked. The func is invoked with the last arguments provided to the debounced function. Subsequent calls to the debounced function return the result of the last func invocation.

/**
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @returns {(...args: any[]) => any}
 */
function debounce(func, wait) {
  let timer;
  let result;
  return function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      result = func.apply(this, args);
    }, wait);
    return result;
  };
}
