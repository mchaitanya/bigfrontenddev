// https://bigfrontend.dev/problem/merge-identical-API-calls/

/**
 * @param {(path: string, config: any) => Promise<any>} getAPI
 * @returns {(path: string, config: any) => Promise<any> & {clearCache: () => void}}
 */
function createGetAPIWithMerging(getAPI) {
  const CACHE_LIMIT = 5;
  const CACHE_EXPIRATION = 1000;
  const cache = new Map();

  function stringify(o) {
    if (Array.isArray(o)) {
      const result = [];
      for (const val of o) {
        result.push(stringify(val));
      }
      return `[${result.sort()}]`;
    } else if (typeof o === "object") {
      const result = [];
      for (const key of Object.keys(o).sort()) {
        result.push(key + ":" + stringify(o[key]));
      }
      return `{${result.join(",")}}`;
    } else {
      return String(o);
    }
  }

  async function getAPIWithMerging(path, config) {
    const now = Date.now();
    const key = stringify([path, config]);
    if (cache.has(key)) {
      const { value, expiration } = cache.get(key);
      if (now < expiration) return value;
    }

    const promise = getAPI(path, config);

    cache.delete(key);
    if (cache.size === CACHE_LIMIT) {
      const { value: first } = cache.keys().next();
      cache.delete(first);
    }
    // Store promises in the cache.
    cache.set(key, { value: promise, expiration: now + CACHE_EXPIRATION });

    return promise;
  }

  getAPIWithMerging.clearCache = function () {
    cache.clear();
  };

  return getAPIWithMerging;
}
