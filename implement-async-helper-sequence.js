// https://bigfrontend.dev/problem/implement-async-helper-sequence/

/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void

*/

// /**
//  * @param {AsyncFunc[]} funcs
//  * @return {(callback: Callback) => void}
//  */
// function sequence(funcs) {
//   return function(callback, data) {
//     function runFunc(index, data) {
//       if (index === funcs.length) {
//         callback(undefined, data);
//       } else {
//         const func = funcs[index];
//         const funcCallback = (error, callbackData) => {
//           if (error) {
//             callback(error);
//           } else {
//             runFunc(index+1, callbackData);
//           }
//         }
//         func.call(this, funcCallback, data);
//       }
//     }

//     runFunc.call(this, 0, data);
//   }
// }

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function sequence(funcs) {
  function createPromise(func, data) {
    return new Promise((resolve, reject) => {
      const callback = function (error, data) {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      };
      func.call(this, callback, data);
    });
  }

  return async function (callback, data) {
    try {
      for (const func of funcs) {
        data = await createPromise(func, data);
      }
      callback(undefined, data);
    } catch (error) {
      callback(error);
    }
  };

  // return function(callback, data) {
  //   let promise = Promise.resolve(data);
  //   for (const func of funcs) {
  //     const promisified = promisify(func);
  //     promise = promise.then((data) => promisified(data));
  //   }
  //   promise.then((data) => callback(undefined, data), (error) => callback(error));
  // }
}

// const noop = (callback) => setTimeout(callback, 10)
// const thunk = sequence([noop, noop, noop])
// thunk((error, data) => {
//   expect(error).toBeUndefined()
//   expect(data).toBeUndefined()
// })
