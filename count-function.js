// https://bigfrontend.dev/problem/count-function

function makeCount() {
  let times = 1;

  const count = function () {
    return times++;
  };

  count.reset = function () {
    times = 1;
  };

  return count;
}

const count = makeCount();

console.log(count());
console.log(count());
console.log(count());

count.reset();

console.log(count());
console.log(count());
console.log(count());
