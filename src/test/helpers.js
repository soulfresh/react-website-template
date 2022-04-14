// This file contains helpers for generating data in tests
// and mock environments.

/**
 * Randomly generate a value or return undefined. This allows you
 * to simulate data that might not be returned from an API.
 * By default it will call the factory (for safety in tests).
 * @param {function} generate - A function to call in order to generate
 *   the return value.
 * @param {boolean} [allowEmptyEntities] - Whether or not to randomly
 *   return undefined.
 * @param {number} [weight] - Modify how often empty values will be generated.
 *   Less than 0 will always result in empty values and greater than 1 will always
 *   result in the generator running.
 * @return {*} The generated item.
 */
export function maybeGenerate(generate, allowEmptyEntities = false, weight = 0.95) {
  if (allowEmptyEntities) {
    if (Math.random() < weight) {
      return generate();
    }
  } else {
    return generate();
  }
}

/**
 * Get a list of random items, using the second list as the data source.
 * If the requested list is longer than the data source, then the
 * data items will be repeated in the output list in a loop.
 * @param {number} count - The number of items to generate.
 * @param {*[]} list - The source list.
 * @return {*[]} The sublist with looping values if needed.
 */
export function listFrom(count, list) {
  return listOf(count, (i) => {
    const index = i % list.length
    return list[index]
  })
}

/**
 * Generate a list of items, calling a factory function
 * to generate each item.
 * @param {number} [count] - The number of items to generate.
 * @param {function} [generate] - The factory used to create
 *   the item. It will be called with the current index in the list.
 *   If the factory is not passed, then the index is returned as
 *   the generated item.
 * @return {*[]} The list of generated items.
 */
export function listOf(count = 1, generate = i => i) {
  const out = [];
  for (let i = 0; i < count; i++) {
    out.push(generate(i, count));
  }
  return out;
}

let id = 0
/**
 * Generate a unique id.
 */
export function generateId() {
  // eslint-disable-next-line no-plusplus
  return String(++id)
}
