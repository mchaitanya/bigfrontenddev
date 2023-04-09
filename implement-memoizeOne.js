// https://bigfrontend.dev/problem/implement-memoizeOne/

/**
 * @param {Function} func
 * @param {(args: any[], newArgs: any[]) => boolean} [isEqual]
 * @returns {any}
 */

function memoizeOne(func, isEqual) {
  let result;
  let prevThis;
  let prevArgs; // array
  if (isEqual === undefined) {
    isEqual = (arr1, arr2) => {
      if (arr1.length !== arr2.length) return false;
      return arr1.every((e, i) => e === arr2[i]);
    };
  }

  return function memoized(...args) {
    if (this === prevThis && isEqual(args, prevArgs)) {
      return result;
    }
    result = func.apply(this, args);
    prevThis = this;
    prevArgs = args;
    return result;
  };
}
