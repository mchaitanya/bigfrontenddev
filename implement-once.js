// https://bigfrontend.dev/problem/implement-once/

/**
 * @param {Function} func
 * @return {Function}
 */
function once(func) {
  let result;
  let calledBefore = false;
  return function onced(...args) {
    if (calledBefore) {
      return result;
    } else {
      result = func.apply(this, args);
      calledBefore = true;
      return result;
    }
  };
}
