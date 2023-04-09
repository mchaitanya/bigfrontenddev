// https://bigfrontend.dev/problem/implement-async-helper-race/

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
function race(funcs) {
  let done = false;

  return function (callback) {
    const funcCallback = (error, data) => {
      if (done) return;
      if (error) {
        callback(error, undefined);
      } else {
        callback(undefined, data);
      }
      done = true;
    };

    for (const func of funcs) {
      func.call(this, funcCallback);
    }
  };
}

// /**
//  * @param {AsyncFunc[]} funcs
//  * @return {(callback: Callback) => void}
//  */
// function race(funcs){
//   function createPromise(func) {
//     return new Promise((resolve, reject) => {
//       const callback = (error, data) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(data);
//         }
//       }
//       func.call(this, callback);
//     });
//   }

//   return function (callback) {
//     Promise.race(funcs.map((func) => createPromise(func)))
//       .then((data) => callback(undefined, data), (error) => callback(error, undefined));
//   }
// }
