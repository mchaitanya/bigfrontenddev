// https://bigfrontend.dev/problem/implement-spyOn/

/**
 * @param {object} obj
 * @param {string} methodName
 */
function spyOn(obj, methodName) {
  const calls = [];

  // Hook the spy into the method.
  const original = obj[methodName];
  if (typeof original !== "function") {
    throw new Error(`${methodName} cannot be called.`);
  }

  obj[methodName] = function (...args) {
    calls.push(args);
    original.apply(this, args);
  };

  return { calls };
}
