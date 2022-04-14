import { makeExecutableSchema } from '@graphql-tools/schema'
import { addMocksToSchema } from '@graphql-tools/mock'
import merge from 'lodash/merge'
import { randNumber } from '@ngneat/falso'

import { listOf } from '~/test/helpers'
import { createGraphClientMock } from '../../graphql-utils/mocks'

import { generateGraphQL } from './graphql-service.generate'

import { loader } from 'graphql.macro';

const schemaDefinition = loader('../graphql-service.schema.graphql');

/**
 * Creates a mock Apollo client that will auto generate fake data
 * for requests against it using the mocks returned by `createGraphMocks`.
 * You can use this function to create Apollo clients that
 * return mock data during testing, the mock server or Storybook.
 *
 * For information on how the schema mocks, see
 * https://www.graphql-tools.com/docs/mocking#mocking-custom-scalar-types
 */
export function createGraphQLServiceMockClient({
  /**
   * Apollo Error Link instance to pass to the Apollo client.
   * You can get an `errorLink` that will trigger the global
   * error handler by importing `createErrorLink` from `Home.jsx`.
   */
  errorLink,
  /** Apollo Cache Link instance to pass to the Apollo client. */
  cache,
  /** Any additional GraphQL Type mocks you wish to merge into the default mocks */
  mocks,
  /** Options to pass to the generator methods (ie. graphql-service.generate) */
  generatorOptions = {},
  /** Resolvers to use as described at https://www.graphql-tools.com/docs/mocking#mockstore */
  resolvers = {},
  /** Whether to perform verbose logging */
  debug = false,
} = {}) {
  const generatorDefaults = {
    includeId: false,
    userCount: randNumber({
      min: 1,
      max: 10,
    }),
  }
  // Merge together our defaults and the overrides passed in.
  const options = { ...generatorDefaults, ...generatorOptions }
  const schema = makeExecutableSchema({ typeDefs: schemaDefinition })

  const schemaWithMocks = addMocksToSchema({
    schema,
    preserveResolvers: false,
    // These type policies configure the field used as the "id" for
    // looking up each relationship object in the mock store.
    // prettier-ignore
    typePolicies: {
      // Tell the mock store to use the 'email' as the key for looking up
      // users. You can specify the look up keys used for any object in
      // the mock store.
      'user' : {keyFieldName : 'email'},
    },
    mocks: merge({
        // Proxy the factories on generate so they pass our
        // generator options to the factory methods.
        // NOTE: If you need to specify mock methods in your
        // tests, you should instead pass the mocks option to
        // createReportAPIClientMock
        ...Object.keys(generateGraphQL).reduce((acc, key) => {
          acc[key] = () => generateGraphQL[key](options)
          return acc
        }, {}),

        // Type mocks
        // These mocks are used to customize the default mocks provided
        // by `@graphql/tools`. You can specify partial implementations
        // for any `type` definition in our schema and the rest of the
        // type will be populated by `@graphql/tools`. This has the advantage
        // that you can provide partial types but you don't have access
        // to the store (cache layer) or query details in these mocks.
        // For that reason, these mocks are often most useful for providing
        // defaults for low level types in your schema.
        // See: https://www.graphql-tools.com/docs/mocking#customizing-mocks
        // query_root: () => ({}),
        // mutation_root: () => ({}),
      },
      // Also merge in any Type mocks that were passed from tests.
      mocks
    ),
    // The `resolvers` mocks give you access to the query parameters
    // and the store (data cache) in your mocks. In order to work, they
    // must return the full data structure expected by your query
    // (ie. they won't fill in default mock values for you like
    // the schema mocks in `createGraphMocks`). You should use
    // these resolvers to ensure that your mocks maintain data
    // values between requests.
    // For more info see:
    // https://www.graphql-tools.com/docs/mocking#mockstore
    resolvers: (store) => ({
      ...resolvers,
      query_root: {
        // This example shows how you could setup the mocks to return a specific
        // user by the email address used in the GraphQL query.
        // users: (_, {where}) => {
        //   const email = where.email._eq
        //   return [store.get('user', email)]
        // },
        // This example shows how you could setup the mocks to return a specific
        // number of users by passing the userCount when you create the mock
        // client.
        users: () => {
          return listOf(generatorOptions.userCount, () => store.get('user'))
        },
        ...resolvers.query_root,
      },
    }),
  })

  return createGraphClientMock(schemaWithMocks, errorLink, cache, debug)
}

