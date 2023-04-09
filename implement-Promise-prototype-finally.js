// https://bigfrontend.dev/problem/implement-Promise-prototype-finally/

/**
 * @param {Promise<any>} promise
 * @param {() => void} onFinally
 * @returns {Promise<any>}
 */
function myFinally(promise, onFinally) {
  return promise.then(
    (data) => {
      const result = onFinally.call(this);
      return Promise.resolve(result).then(() => data);
      // if (!(result instanceof Promise)) {
      //   return data;
      // } else {
      //   return result.then(() => data);
      // }
    },
    (error) => {
      const result = onFinally.call(this);
      return Promise.resolve(result).then(() => Promise.reject(error));
      // if (!(result instanceof Promise)) {
      //   throw error;
      // } else {
      //   return result.then(() => Promise.reject(error));
      // }
    }
  );
}
