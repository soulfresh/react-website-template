import Faker from 'faker';

/**
 * This namespace provides functions that allow you
 * to generate data specific to your domain.
 * Ensure that all of your factory functions take
 * a `randomize` parameter that will turn off randomization
 * by default. If not you can expect flakey tests.
 */
export const fake = {
  /**
   * Generate a fake user name.
   * @param {boolean} [randomize] - Whether the data
   *   should be randomized. Defaults to false for safety
   *   in tests.
   * @return {string}
   */
  name(randomize) {
    return randomize
      ? Faker.firstName()
      : 'Spongebob';
  },
}
