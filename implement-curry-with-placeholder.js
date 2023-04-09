// https://bigfrontend.dev/problem/implement-curry-with-placeholder/

function curry(fn) {
  function areArgsMet(args) {
    if (args.length < fn.length) return false;
    for (let i = 0; i < fn.length; i++) {
      if (args[i] === curry.placeholder) return false;
    }
    return true;
  }

  function mergeArgs(args1, args2) {
    const result = [];
    for (let i1 = 0, i2 = 0; i1 < args1.length || i2 < args2.length; ) {
      if (i1 >= args1.length) {
        result.push(args2[i2++]);
      } else if (i2 >= args2.length) {
        result.push(args1[i1++]);
      } else if (args1[i1] === curry.placeholder) {
        result.push(args2[i2++]);
        i1++;
      } else {
        result.push(args1[i1++]);
      }
    }
    return result;
  }

  return function curried(...args) {
    if (areArgsMet(args)) {
      return fn.apply(this, args);
    } else {
      return function (...newArgs) {
        const mergedArgs = mergeArgs(args, newArgs);
        return curried.call(this, ...mergedArgs);
      };
    }
  };
}

curry.placeholder = Symbol();

const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};

const curriedJoin = curry(join);
const _ = curry.placeholder;

console.log(curriedJoin(1, 2, 3)); // '1_2_3'

console.log(curriedJoin(_, 2)(1, 3)); // '1_2_3'

console.log(curriedJoin(_, _, _)(1)(_, 3)(2)); // '1_2_3'

console.log(curriedJoin(_, _, _)(1)(_, 3, 2)); // [Function (anonymous)]
