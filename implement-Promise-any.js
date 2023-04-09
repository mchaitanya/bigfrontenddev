// https://bigfrontend.dev/problem/implement-Promise-any

/**
 * @param {Array<Promise>} promises
 * @return {Promise}
 */
function any(promises) {
  return new Promise((resolve, reject) => {
    promises = Array.from(promises);
    if (promises.length === 0) {
      reject(new AggregateError("Iterable passed into any is empty.", []));
      return;
    }

    let pending = 0;
    const errors = new Array(promises.length);
    for (let i = 0; i < promises.length; i++) {
      const p = promises[i];
      if (!(p instanceof Promise)) {
        resolve(p);
      } else {
        pending++;
        p.then(
          (data) => resolve(data),
          (error) => {
            errors[i] = error;
            pending--;
            if (pending === 0) {
              reject(
                new AggregateError(
                  "No promise passed into any was resolved.",
                  errors
                )
              );
            }
          }
        );
      }
    }
  });
}
