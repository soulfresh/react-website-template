import faker from 'faker'

let theid = 0
const id = (includeId = true) => {
  // The database uses uuids instead of auto-incrementing
  // ids so we'll fake that by returning a String.
  if (includeId) return String(theid + 1)
}

/**
 * `generate` provides factories for generating each
 * of the types defined in our Example API schema (`~/example-graph-api-schema.graphql`).
 *
 * You can use the `generate` factories in your tests,
 * in your Storybook stories and in the Apollo mocks
 * (defined in `example-service-schema-mocks.ts`).
 * The shape of the values returned by the `generate`
 * factories match the shape returned by the Example API
 * GraphQL schema. This is great when mocking GraphQL
 * responses but less useful if your tests/stories do not
 * hit the Example API Service class (this will be the case
 * everywhere except integration tests). In those cases,
 * you should pass the data returned by `generate` through one of the
 * `fromExampleGraph` transform methods in order to
 * get the same shape of data returned by the Example API Service.
 *
 * ```js
 * import { transform } from '~/services/example-service';
 * import { generate } from '~/services/example-service/mocks';
 *
 * // Create a user object as it is returned by GraphQL
 * const user = generate.user();
 *
 * // Transform the user object for use in the application
 * const property = transform.user(user);
 *
 * // Now you can pass the property object directly to
 * // your components.
 * ```
 *
 * ### Developer Notes
 *
 * Each of the factories on this object should match the name
 * of a type definition in the `~/example-graph-api-schema.graphql`
 * file and should return a value matching that type.
 */
export const generate = {
  // Use the same method as other ids
  uuid: () => id(),

  user_name: () => `${faker.name.firstName()} ${faker.name.lastName()}`,
}
