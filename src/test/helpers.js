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

let id = 0;
/**
 * Generate a unique id.
 * @param {boolean} [doGen] - Whether to return undefined
 *   or a unique id. This makes it easy to use `!!generateId(includeId)`
 *   in our mock factories.
 *   false = return undefined.
 *   true || undefined = return a unique id.
 */
export function generateId(doGen) {
  if (doGen == null || doGen) {
    return ++id;
  }
}

