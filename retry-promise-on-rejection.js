// https://bigfrontend.dev/problem/retry-promise-on-rejection/

/**
 * @param {() => Promise<any>} fetcher
 * @param {number} maximumRetryCount
 * @return {Promise<any>}
 */
function fetchWithAutoRetry(fetcher, maximumRetryCount) {
  return fetcher().catch((error) => {
    if (maximumRetryCount === 0) {
      return Promise.reject(error);
    } else {
      return fetchWithAutoRetry(fetcher, maximumRetryCount - 1);
    }
  });
}
