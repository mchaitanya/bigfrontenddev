// https://bigfrontend.dev/problem/call-APIs-with-pagination/

// fetchList is provided for you
// const fetchList = (since?: number) =>
//   Promise<{items: Array<{id: number}>}>

// you can change this to generator function if you want
const fetchListWithAmount = async (amount = 5) => {
  const result = [];
  function fetch() {
    if (result.length >= amount) {
      return Promise.resolve(result.slice(0, amount));
    } else {
      const lastItem = result.length > 0 ? result[result.length - 1] : null;
      const promise = lastItem ? fetchList(lastItem.id) : fetchList();
      return promise.then((response) => {
        const items = response.items;
        if (items.length === 0) {
          return result;
        } else {
          result.push(...items);
          return fetch();
        }
      });
    }
  }
  return fetch();

  // const {items: result} = await fetchList();
  // if (result.length === 0) return [];

  // let lastItem = result[result.length-1];
  // while (result.length < amount) {
  //   const {items} = await fetchList(lastItem.id);
  //   if (items.length === 0) break;
  //   lastItem = items[items.length-1];
  //   result.push(...items);
  // }

  // return result.slice(0, amount);
};
