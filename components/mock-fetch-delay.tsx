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
      fetchFunction()
        .then(resolve)
        .catch((error: unknown) => {
          if (error instanceof Error) {
            reject(error);
          } else {
            const errorMessage =
              typeof error === 'string' ? error : String(error);
            reject(new Error(`Issue with mockFetchDelay: ${errorMessage}`));
          }
        });
    }, delay);
  });
}
