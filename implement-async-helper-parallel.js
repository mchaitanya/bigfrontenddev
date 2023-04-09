// https://bigfrontend.dev/problem/implement-async-helper-parallel/

/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void

*/

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function parallel(funcs) {
  let errored = false;
  let pending = funcs.length;
  const result = new Array(funcs.length);

  return function (callback) {
    for (let i = 0; i < funcs.length; i++) {
      const funcCallback = (error, data) => {
        if (errored) return;
        if (error) {
          callback(error, undefined);
          errored = true;
        } else {
          result[i] = data;
          pending--;
          if (pending === 0) {
            callback(undefined, result);
          }
        }
      };

      funcs[i].call(this, funcCallback);
    }
  };
}

// /**
//  * @param {AsyncFunc[]} funcs
//  * @return {(callback: Callback) => void}
//  */
// function parallel(funcs) {
//   function createPromise(func) {
//     return new Promise((resolve, reject) => {
//       const callback = (error, data) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(data);
//         }
//       };
//       func.call(this, callback);
//     });
//   }

//   return function(callback) {
//     Promise.all(funcs.map((func) => createPromise(func)))
//       .then((data) => callback(undefined, data), (error) => callback(error, undefined));
//   }
// }
