import {
  generateId,
  fake,
  maybeRandomize,
  randomNumber,
  listOf,
} from '~/test';

/**
 * This namespace defines functions for generating
 * the mock data in the graph API. There should be
 * a function for every object in the API which returns
 * the object as it's returned from the graph.
 *
 * IMPORTANT:
 * Every factory function should only randomize the
 * data returned if specifically asked to do so.
 * This will ensure that data in tests is not randomized,
 * including the number of items in lists. Failing
 * to do this will result in flakey tests that are
 * hard to debug.
 */
export const generateExampleGraphAPI = {
  // Example factory for "item" objects
  // returned by the graph.
  item({
    // Whether or not to randomize the data returned.
    // It is important that the data in tests is never
    // randomized or we risk flakey tests.
    randomize,
    // Whether or not the object generated
    // should include an id. This allows us
    // to create an object to be passed to
    // the graph during testing. All factory functions
    // that produce objects with an id should accept this.
    includeId,

    // Any properties on your generated object should be accepted
    // by the factory functions so you can override
    // them during testing. For example:
    // `const item = generateExampleGraphAPI.item({name: 'Bob'});`
    //
    // If the propery is not passed,
    // then a default should be generated. If `randomize`
    // is false, the property should always have the same
    // value.
    //
    // Use the `fake` object to generate data that
    // matches your domain model. Don't forget to pass
    // `randomize` so you can randomize the data in the
    // static server and storybook.
    name = fake.name(randomize),
    // For objects that include an id, you should allow the
    // factory function to return undefined ids for instances
    // where you want to generate objects that haven't been
    // saved to the graph yet.
    id = generateId(!!includeId),
    // When generating a list of elements, you should allow
    // configuration of the number of items in that list.
    // You should also ensure that the value is not randomized
    // during tests by passing the randomize value through.
    widgetCount = randomNumber(1, 10, randomize),
    // When generating the list of elements, you should ensure
    // that the list is not randomized during testing to
    // avoid flakey tests.
    widgets = maybeRandomize(
      // In tests, this will always return `['Spongebob']`.
      // In the static serve and Storybook, this will return
      // a random list of 1 to 10 user names.
      () => listOf(widgetCount, () => fake.name(randomize)),
      randomize,
    ),
  } = {}) {
    return {id, name};
  },
};

