// https://bigfrontend.dev/problem/implement-curry/
const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};

const curriedJoin = curry(join);

console.log(curriedJoin(1, 2, 3)); // '1_2_3'

console.log(curriedJoin(1)(2, 3)); // '1_2_3'

console.log(curriedJoin(1, 2)(3)); // '1_2_3'

console.log(curriedJoin(1)(2)(3)); // '1_2_3'

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      // A function's length property tells us how many params it expects.
      return fn.apply(this, args);
    } else {
      return curried.bind(this, ...args);
    }
  };
}
