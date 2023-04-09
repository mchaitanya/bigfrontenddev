// https://bigfrontend.dev/problem/throttle-Promises/

/**
 * @param {() => Promise<any>} func
 * @param {number} max
 * @return {Promise}
 */
function throttlePromises(funcs, max) {
  let next = 0;
  let pending = 0;
  let errored = false;
  const result = new Array(funcs.length);

  return new Promise((resolve, reject) => {
    if (funcs.length === 0) {
      resolve([]);
      return;
    }

    function start(index) {
      if (errored) return;
      pending++;
      funcs[index]().then(
        (value) => {
          result[index] = value;
          pending--;
          if (next < funcs.length) {
            start(next++);
          } else if (pending === 0) {
            resolve(result);
          }
        },
        (error) => {
          reject(error);
          errored = true;
        }
      );
    }

    while (next < max && next < funcs.length) {
      start(next++);
    }
  });
}
