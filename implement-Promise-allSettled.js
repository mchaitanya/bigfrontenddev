// https://bigfrontend.dev/problem/implement-Promise-allSettled/

/**
 * @param {Array<any>} promises - notice that input might contains non-promises
 * @return {Promise<Array<{status: 'fulfilled', value: any} | {status: 'rejected', reason: any}>>}
 */
function allSettled(promises) {
  return new Promise((resolve, reject) => {
    promises = Array.from(promises);
    if (promises.length === 0) {
      resolve([]);
      return;
    }

    let pending = 0;
    const result = new Array(promises.length);

    const callback = (index, status) => {
      result[index] = status;
      pending--;
      if (pending === 0) resolve(result);
    };

    for (let i = 0; i < promises.length; i++) {
      const p = promises[i];
      if (!(p instanceof Promise)) {
        result[i] = { status: "fulfilled", value: p };
      } else {
        pending++;
        p.then(
          (data) => callback(i, { status: "fulfilled", value: data }),
          (error) => callback(i, { status: "rejected", reason: error })
        );
      }
    }
  });
}
