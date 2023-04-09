// https://bigfrontend.dev/problem/implement-general-memoization-function/

/**
 * @param {Function} func
 * @param {(args:[]) => string }  [resolver] - cache key generator
 */
function memo(func, resolver) {
  // Ideally func & resolver should be pure functions and shouldn't reference this.
  const cache = new Map();
  return function memoized(...args) {
    const key = resolver ? resolver(...args) : args.join("_");
    if (!cache.has(key)) {
      cache.set(key, func.apply(this, args));
    }
    return cache.get(key);
  };
}
