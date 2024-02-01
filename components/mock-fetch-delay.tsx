/*
 * Feeds a function that will return a promise with a delay
 * good to test skeletons and loading states
 */

export function mockFetchDelay<T>(
  fetchFunction: () => Promise<T>,
  delay = 3000,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      fetchFunction().then(resolve).catch(reject);
    }, delay);
  });
}
