
/**
 * Wait for the given promise to either resolve or reject.
 * This helps clarify the intent of tests and prevents
 * tests from failing if the promise rejects.
 * @param {Promise<*>} promise
 * @return {Promise<void>}
 */
export async function waitForPromise(promise) {
  await promise.catch(() => {});
};

/**
 * Wait for the specified number of milliseconds.
 * @param {number} ms
 * @return {Promise<void>}
 */
export function waitForMS(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
}

// These don't seem to work with the latest version of @testing-framework.
// function waitForTrue(cb) {
//   return waitFor(() => {
//     return new Promise((resolve, reject) => {
//       if (cb()) resolve()
//       else reject()
//     });
//   })
// }
// /**
//  * Wait for the given callback to return true.
//  * This functions similarly to the waitFor method
//  * from @testing-library except that your callback
//  * should return a boolean, rather than throwing an exception.
//  * This makes it a little easier to read and write
//  * terse wait for statements.
//  * @example
//  *   await waitFor(() => foo.calls.count > 0);
//  * @param {function} cb
//  */
// export const waitForTrue = async cb => {
//   await waitFor(() => {
//     if (!cb()) throw new Error('waitForTrue timed out waiting for a truthy value.');
//   });
// };
