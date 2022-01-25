import { ApolloLink } from '@apollo/client'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { addMocksToSchema } from '@graphql-tools/mock'
import merge from 'lodash/merge'
import faker from 'faker'

import { createGraphClientMock } from '../../graphql-utils/mocks'

import { generate } from './example-service-generate'

import schemaDefinition from '~/example-graph-api-schema.graphql'

type Bag = { [key: string]: any }

/**
 * Creates a mock Apollo client that will auto generate fake data
 * for requests against it using the mocks returned by `createGraphMocks`.
 * You can use this function to create Apollo clients that
 * return mock data during testing, the mock server or Storybook.
 *
 * For information on how the schema mocks, see
 * https://www.graphql-tools.com/docs/mocking#mocking-custom-scalar-types
 */
export function createExampleServiceClientMock({
  /**
   * Apollo Error Link instance to pass to the Apollo client.
   * You can get an `errorLink` that will trigger the global
   * error handler by importing `createErrorLink` from `Home.jsx`.
   */
  errorLink,
  /** Apollo Cache Link instance to pass to the Apollo client. */
  cache,
  /** Any additional mocks you wish to merge into the default mocks */
  mocks,
  /** Options to pass to the generator methods (ie. graph-generate) */
  generatorOptions,
  /** Resolvers to use as described at https://www.graphql-tools.com/docs/mocking#mockstore */
  resolvers,
  /** Whether to perform verbose logging */
  debug = false,
}: {
  errorLink?: ApolloLink
  cache?: any
  mocks?: Bag
  generatorOptions?: Bag
  resolvers?: any
  debug?: boolean
} = {}) {
  const defaultMocks = createGraphMocks(generatorOptions)
  const schema = makeExecutableSchema({ typeDefs: schemaDefinition })

  const schemaWithMocks = addMocksToSchema({
    schema,
    preserveResolvers: false,
    mocks: merge(defaultMocks, mocks),
    resolvers,
    // If you need to access data from the mock store in
    // your generators, you can use the resolvers key as
    // described here:
    // https://www.graphql-tools.com/docs/mocking#mockstore
    // resolvers: resolvers || (store) => ({
    //   query_root: {
    //     user: (/*_, variables*/) => {}
    //   },
    // }),
  })

  return createGraphClientMock(schemaWithMocks, errorLink, cache, debug)
}

/**
 * Create the mock definitions used by `createExampleServiceClientMock`
 * and as described in the
 * [`graphql-tools` docs](https://www.graphql-tools.com/docs/mocking#mocking-custom-scalar-types).
 * You generally won't need to use this function directly as
 * `createExampleServiceClientMock` is more useful for testing.
 * Each property on the returned object is a factory function
 * that can be used to create objects matching the shape of
 * that type in the GraphQL schema. You can customize the
 * factories by passing an options object which will in turn
 * be used by the factories when generating data.
 *
 * @param options - Any options accepted by the various methods in
 * `example-graphql-service/mocks/example-service-generate`. The options
 * will be passed through to the individual type factories
 * returned by this function.
 */
function createGraphMocks({
  includeId = true,
  userCount = faker.datatype.number({ min: 1, max: 10 }),
  ...rest
}: Bag = {}) {
  // Generator options to pass to `generate` method calls.
  const options = { includeId, ...rest }

  return {
    // Proxy the factories on generate so they pass our
    // generator options
    ...Object.keys(generate).reduce((acc, key) => {
      acc[key] = () => generate[key](options)
      return acc
    }, {}),

    // GraphQL queries
    query_root: () => ({
      user: () => [...new Array(userCount)],
    }),

    // GraphQL mutations
    // mutation_root: () => ({
    // }),
  }
}
