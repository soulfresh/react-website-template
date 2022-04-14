import { randUser, randParagraph } from '@ngneat/falso'
import { generateId } from '~/test/helpers'

/**
 * Maybe generate an id value. If `includeId` is false, then undefined
 * is returned which allows the GraphQL mocks to generate their own
 * ids.
 * @param [includeId] - Whether to return a unique id or undefined.
 * @return The id string
 */
function id(includeId) {
  return includeId ? generateId() : undefined
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
  user: ({
    // Passing false for `includeId` allows you to generate graphql
    // objects without the ids which is useful for mocking data
    // to insert into GraphQL during testing.
    includeId,
    user = randUser(),
    user_id = user.id,
    email = user.email,
    first_name = user.firstName,
    last_name = user.lastName,
    profile_picture = user.img,
    bio = randParagraph(),
  } = {}) => ({
    user_id,
    email,
    first_name,
    last_name,
    profile_picture,
    bio,
  }),
}
