import {
  makeExecutableSchema,
  addMocksToSchema,
} from 'graphql-tools';

import {
  createGraphClientMock,
  makeGraphQLCacheClient,
} from '../../graphql';

// This schema definition should be pulled from the live server
// using `yarn download-schemas` and checked into the repository.
import schemaDefinition from '~/example-graph-api-schema.graphql';

import {
  collapseNestedRelationships,
  bigInt,
} from '../../graphql';
import {
  generateExampleGraphAPI as generate
} from './generate';

/**
 * Generates a mock client that will auto generate fake data
 * for requests against it using the mocks defined in `generate.js`.
 * Used to serve a static version of the site for development
 * and documentation.
 *
 * @param {function} errorLink - A function to link GraphQL errors
 *   into the application. You can get an errorLinkfrom `createGraphQLErrorLink`
 *   in the `service/graphql` package.
 * @param {*} [additionalMocks] - A list of mock generators to merge into
 *   the default mocks provided by `schema.mock.js`. This is useful if you
 *   want to provide specific responses in your tests for a certain graph query.
 * @param {*} [generatorOptions] - Options to pass through to your mock generators
 *   defined in `./generate.js`.
 * @param {*} [cache] - A cache objet to pass to use with the Apollo client.
 *   Defaults to using an InMemoryCache object.
 */
export function createExampleGraphClientMock(
  errorLink,
  additionalMocks,
  generatorOptions,
  cache = makeGraphQLCacheClient(),
) {
  const mocks = createExampleGraphMocks( generatorOptions);
  const schema = makeExecutableSchema({ typeDefs: schemaDefinition });
  addMocksToSchema({
    schema,
    mocks: {
      ...mocks,
      ...additionalMocks
    }
  });

  return createGraphClientMock(errorLink, cache, schema);
};

/**
 * Provides ExampleGraphAPI mocks for Apollo.
 */
export function createExampleGraphMocks(options = {}) {
  const generatorOptions = {includeId: true, ...options};
  console.debug('[MOCK] options:', generatorOptions);

  return {
    query_root: () => ({
      // Example mock response when querying for "items"
      items: (_, query, __, {variableValues}) => generate.items(options),
    }),

    mutation_root: () => ({
      // Example mock response when creating "items"
      insert_items: (_, result, __, {variableValues}) => {
        const unnested = collapseNestedRelationships(result.objects[0]);

        return {
          affected_rows: 1,
          returning: () => [
            generate.collection({
              ...generatorOptions,
              ...unnested,
              created_at: (new Date()).toISOString(),
            })
          ]
        };
      },

      // Example mock response when updating an "item"
      update_items: (_, result, __, {variableValues}) => {
        const item_id = result.where.item_id._eq;
        return {
          affected_rows: 1,
          returning: () => [{
            item_id,
            ...variableValues
          }]
        }
      },

      // Example mock response when deleting an "item"
      delete_art_collections: () => ({affected_rows: 1}),
    }),

    // Provide an implementation for the `bigInt` datatype.
    bigint: bigInt,
  }
}
