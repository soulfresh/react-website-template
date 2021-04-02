import {
  ApolloClient,
  ApolloLink,
  SchemaLink,
  InMemoryCache,
} from '@apollo/client';
import { MockLink } from '@apollo/client/testing';

import { env } from '../../env';
import { LoggingLink } from './logging-link';

/**
 * Create a mock Apollo GraphQL client with the given mock schema.
 * This can be used both in testing and in a mock environment.
 * It does not provide as much control as `createTestClient` but
 * is easier to setup because it does not require mocking every
 * request and response.
 *
 * You can get an errorLink that will trigger the global
 * error handler by importing `createGraphQLErrorLink` from
 * the `service/graphql` package.
 */
export function createGraphClientMock(
  errorLink,
  cache,
  schema,
) {
  const links = [];

  if (env.verbose) links.push(new LoggingLink());

  // Add error linking
  if (errorLink) links.push(errorLink);

  // Add schema link
  links.push(new SchemaLink({ schema }));

  return new ApolloClient({
    link: ApolloLink.from(links),
    cache: cache || new InMemoryCache(),
  });
}

/**
 * Generate a mock client for use in tests. This client
 * gives you explicit control over each response but also
 * requires that you setup response data for every request.
 *
 * This client receives an array of mocks with the following
 * structure:
 *
 * ```js
 * [{
 *   request: {
 *     query: GQL_QUERY,
 *     variables: {
 *       ...variables must match the request exactly
 *     },
 *   },
 *   ...optional properties below
 *   result: {
 *     data: {
 *       ...result data goes here
 *     },
 *   },
 *   error: new Error('your error here'),
 * }]
 * ```
 *
 * You can pass an empty array in order to test the
 * loading state of a request.
 *
 * More information about mocking can be found at:
 * https://www.apollographql.com/docs/react/development-testing/testing/#testing-loading-states
 *
 * You can get an errorLink that will trigger the global
 * error handler by importing `createGraphQLErrorLink` from
 * the `service/graphql` package.
 */
export function createTestClient(m, errorLink, cache) {
  const links = [];

  if (env.verbose) links.push(new LoggingLink());

  // Add error linking
  if (errorLink) links.push(errorLink);

  // Add schema link
  links.push(new MockLink(m, false));

  return new ApolloClient({
    link: ApolloLink.from(links),
    cache: cache || new InMemoryCache({addTypename: false}),
  });
}

