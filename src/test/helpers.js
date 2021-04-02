import Faker from 'faker';

// This file contains helpers for generating data in tests
// and mock environments.

/**
 * Maybe randomize a value. By default the value is not
 * randomized (for safety in tests) and the `defaultValue`
 * is returned.
 *
 * @param {function} generate - A function that will be called
 *   to generate the random value.
 * @param {*} defaultValue - The value to return if not randomizing.
 * @param {boolean} [randomize] - Whether or not to randomize.
 * @return {*} The generated item.
 */
export function maybeRandomize(generate, defaultValue, randomize = false) {
  return randomize ? generate() : defaultValue;
}

/**
 * Randomly generate a value or return undefined. This allows you
 * to simulate data that might not be returned from an API.
 * By default it will call the factory (for safety in tests).
 * @param {function} generate - A function to call in order to generate
 *   the return value.
 * @param {boolean} [allowEmptyEntities] - Whether or not to randomly
 *   return undefined.
 * @return {*} The generated item.
 */
export function maybeGenerate(generate, allowEmptyEntities = false) {
  if (allowEmptyEntities) {
    if (randomBool()) {
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

/**
 * Generate a list of items with a random length between
 * min and max items.
 * @param {function} [generate] - The factory used to create
 *   the item. It will be called with the current index in the list.
 *   If the factory is not passed, then the index is returned as
 *   the generated item.
 * @param {number} [min] - Defaults to 1.
 * @param {number} [max] - Defaults to the same value as min.
 * @return {*} The list of generated items.
 */
export function randomList(generate = i => i, min = 1, max = min) {
  const count = Faker.random.number({min, max});
  return listOf(count, generate);
}

/**
 * Generate a random boolean value.
 * @param {boolean} [randomize] - Whether to randomize the value.
 * @param {boolean} [defaultValue] - The default value to return if
 *   not randomzied. Defaults to true.
 * @return {boolean}
 */
export function randomBool(randomize, defaultValue = true) {
  return maybeRandomize(
    () => Math.random() < 0.5,
    defaultValue,
    randomize,
  );
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

/**
 * Generate a random number between min and max.
 * @param {number} [min] - Defaults to 1.
 * @param {number} [max] - Defaults to the value of min.
 * @param {boolean} [randomize] - Whether or not to randomize the value.
 * @param {number} [defaultValue] - The default value to use if not
 *   randomizing the result. Defaults to the same value as min.
 * @return {number}
 */
export function randomNumber(min = 1, max = min, randomize = false, defaultValue = min) {
  if (max < min) max = min;
  return maybeRandomize(
    () => Faker.random.number({min, max}),
    defaultValue,
    randomize
  );
}

/**
 * Generate a random number of text paragraphs.
 * @param {number} [min] - Defaults to 1.
 * @param {number} [max] - Defaults to the value of min.
 * @return {string} Random text in paragraphs.
 */
export function paragraphs(min = 1, max = min) {
  return Faker.lorem.paragraph(Faker.random.number({min, max}));
}

