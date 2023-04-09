// https://bigfrontend.dev/problem/create-your-own-Promise/

class MyPromise {
  constructor(executor) {
    const resolveFn = (value) => {
      if (this.fulfilled || this.rejected) return;
      this.result = value;
      this.fulfilled = true;
      for (const callback of this.successCallbacks) {
        callback(value);
      }
    };

    const rejectFn = (error) => {
      if (this.fulfilled || this.rejected) return;
      this.result = error;
      this.rejected = true;
      for (const callback of this.errorCallbacks) {
        callback(error);
      }
    };

    this.successCallbacks = [];
    this.errorCallbacks = [];

    try {
      executor.call(null, resolveFn, rejectFn);
    } catch (error) {
      rejectFn(error);
    }
  }

  then(onFulfilled, onRejected) {
    let successCallback, errorCallback;
    const promise = new MyPromise((resolve, reject) => {
      const callback = (fn, data) => {
        try {
          const next = fn(data);
          if (next instanceof MyPromise) {
            next.then(resolve, reject);
          } else {
            resolve(next);
          }
        } catch (error) {
          reject(error);
        }
      };

      successCallback = (data) => {
        if (typeof onFulfilled === "function") {
          callback(onFulfilled, data);
          return;
        }
        resolve(data);
      };

      errorCallback = (error) => {
        if (typeof onRejected === "function") {
          callback(onRejected, error);
          return;
        }
        reject(error);
      };
    });

    if (!this.fulfilled && !this.rejected) {
      this.successCallbacks.push(successCallback);
      this.errorCallbacks.push(errorCallback);
    } else if (this.fulfilled) {
      // setTimeout to make the handlers run async.
      setTimeout(() => successCallback(this.result), 0);
    } else {
      setTimeout(() => errorCallback(this.result), 0);
    }

    return promise;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    } else {
      return new MyPromise((resolve) => resolve(value));
    }
  }

  static reject(value) {
    if (value instanceof MyPromise) {
      return value;
    } else {
      return new MyPromise((resolve, reject) => reject(value));
    }
  }
}

// const mp = new Promise((resolve) => {
//   setTimeout(() => resolve('hello'), 1000);
// });

// mp.then((result) => console.log(result));

// mp.then((result) => console.log(result));

// mp.then((s) => s + ' world')
//   .then((result) => console.log(result));
