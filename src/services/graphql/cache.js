import { InMemoryCache } from '@apollo/client';

/**
 * Make an apollo cache client that can be used to cache results so they're
 * not always requested from the server.
 */
export function makeGraphQLCacheClient() {
  return new InMemoryCache({
    addTypename: true,
    // cacheRedirects allow us to redirect to queries to the cache if
    // the query is different but we know the data may already exist in
    // cache. For example, if you have a page that shows a list of items
    // and then you visit the details for an item, you can pull the item
    // details from the cache if the list page already retrieved all the
    // data you need.
    cacheRedirects: {
      Query: {
        // Replace 'items' with the object type you need to get from cache.
        items: (_, query, { getCacheKey }) => {
          // If the query contains an id, try to get the item from cache first
          // in case we previously loaded it with a different query.
          if (query && query.where && query.where.id && query.where.id._eq) {
            return [
              getCacheKey({ __typename: 'items', id: query.where.id._eq })
            ];
          }
          return _;
        }
      },
    },
  });
}
