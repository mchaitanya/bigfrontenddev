// https://bigfrontend.dev/problem/implement-Promise-all/

/**
 * @param {Array<any>} promises - notice input might have non-Promises
 * @return {Promise<any[]>}
 */
function all(promises) {
  promises = Array.from(promises);
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]);
      return;
    }

    let pending = 0;
    const result = new Array(promises.length);
    for (let i = 0; i < promises.length; i++) {
      const p = promises[i];
      if (!(p instanceof Promise)) {
        result[i] = p;
      } else {
        pending++;
        p.then(
          (data) => {
            result[i] = data;
            pending--;
            if (pending === 0) resolve(result);
          },
          (error) => reject(error)
        );
      }
    }
  });
}
