// https://bigfrontend.dev/problem/implement-range/

/**
 * @param {integer} from
 * @param {integer} to
 */
function range(from, to) {
  let i = from;
  return {
    [Symbol.iterator]() {
      return {
        next() {
          return {
            done: i > to,
            value: i++,
          };
        },
      };
    },
  };

  // const arr = [];
  // for (let i = from; i <= to; i++) {
  //   arr.push(i);
  // }
  // return arr;
}
