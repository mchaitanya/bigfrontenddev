// https://bigfrontend.dev/problem/implement-basic-throttle/

// https://lodash.com/docs/4.17.15#throttle
// Creates a throttled function that only invokes func at most once per every wait milliseconds. The func is invoked with the last arguments provided to the throttled function. Subsequent calls to the throttled function return the result of the last func invocation.

function throttle(fn, delay) {
  let timer;
  let result;
  let nextThis, nextArgs;

  function startTimer() {
    return setTimeout(() => {
      if (nextThis == null) {
        timer = null;
        return;
      }
      result = fn.apply(nextThis, nextArgs);
      timer = startTimer();
      nextThis = null;
      nextArgs = null;
    }, delay);
  }

  return function throttled(...args) {
    if (timer == null) {
      result = fn.apply(this, args);
      timer = startTimer();
    } else {
      nextThis = this;
      nextArgs = args;
    }
    return result;
  };
}

let currentTime = 0;

const run = (input) => {
  currentTime = 0;
  const calls = [];

  const func = (arg) => {
    calls.push(`${arg}@${currentTime}`);
  };

  const throttled = throttle(func, 3);
  input.forEach((call) => {
    const [arg, time] = call.split("@");
    setTimeout(() => throttled(arg), time);
  });
  return calls;
};

console.log(run(["A@0", "B@2", "C@3"]));
