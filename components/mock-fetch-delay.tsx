/*
 * Feeds a function that will return a promise with a delay
 * good to test skeletons and loading states
 */
// @ts-ignore
export function mockFetchDelay(fetchFunction, delay = 3000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetchFunction().then(resolve).catch(reject);
    }, delay);
  });
}
