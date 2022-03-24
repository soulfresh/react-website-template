import React from 'react'

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  // gql,
  // Observable,
} from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import { ServiceBase } from '@thesoulfresh/utils'

import { env } from '~/env'

import { LoggingLink, makeGraphQLErrorLink } from '../graphql-utils'
import { fromExampleGraph /*, toExampleGraph*/ } from './transform'
import { makeExampleServiceCacheClient } from './cache'

import * as graph from './example-service-definitions'

/*
 * Use this class to make GraphQL requests.
 *
 * Global error handling is taken care of
 * by the Apollo client configuration.
 */
export class ExampleService extends ServiceBase {
  constructor({
    onAuthFailure,
    authToken,
    client,
    url = env.exampleGraphAPI,
    debug = env.verbose,
  }) {
    /* istanbul ignore next: never use the live api during testing */
    if (!client) {
      const retry = new RetryLink()

      const http = new HttpLink({
        uri: url,
        headers: {
          Authorization: `Bearer ${authToken}`,
          //todo: get auth0 integration working
          'x-hasura-admin-secret': 'developer',
        },
      })

      const errorLink = makeGraphQLErrorLink(onAuthFailure)

      const links = [errorLink, retry, http]

      if (debug) links.unshift(new LoggingLink())

      client = new ApolloClient({
        link: ApolloLink.from(links),
        cache: makeExampleServiceCacheClient(),
      })
    }

    super(client, client.debug ?? debug)

    this.info('created with API', env.exampleGraphAPI)
  }

  /**
   * Clear the data cache (for example after logout).
   * Returns a promise that will resolve after the
   * cache has been cleared.
   *
   * For more info, see:
   * https://www.apollographql.com/docs/react/caching/cache-interaction/#resetting-the-store
   */
  clear() {
    return this.client.clearStore()
  }

  getUsers() {
    // Always log the call start. In production these calls are filtered
    // unless verbose mode is turned on.
    this.debug('getUsers', arguments)

    const variables = {}

    return this.client
      .query({
        query: graph.GET_USERS,
        variables,
      })
      .then((results) => {
        const users = results.data.users
        // Transform the data into the format used by the UI
        const out = users?.map(u => fromExampleGraph.user(u)) || []
        this.info('getUsers SUCCESS', out)
        return out
      })
  }

  // Example of how to get a collection from the cache
  // getCachedItems() {
  //   const { items } = this.client.readQuery({
  //     query: graph.GET_ITEMS,
  //   });
  //   return items;
  // }

  // Example of how to put a collection in the cache
  // updateCachedItems(items) {
  //   this.client.writeQuery({
  //     query: graph.GET_ITEMS,
  //     data: {items},
  //   });
  // }

  // Example of how to get an item from the cache
  // getCachedItem(itemId) {
  //   const { items } = this.client.readQuery({
  //     query: graph.GET_ITEM,
  //     variables: {id: itemId}
  //   });
  //
  //   // Add the new item to the collection.
  //   return (items && items.length > 0)
  //     ? items[0]
  //     : null;
  // }

  // Example of how to put an item in the cache
  // updateCachedItem(itemId, items) {
  //   this.client.writeQuery({
  //     query: graph.GET_ITEM,
  //     variables: {id: itemId},
  //     data: {items: [ items ]},
  //   });
  // }

  // Example of how to observe the cache
  // watchItems() {
  //   return new Observable(o => this.client.watchQuery({
  //     query: graph.GET_ITEMS,
  //     fetchResults: true,
  //     fetchPolicy: 'cache-first',
  //   }).subscribe({
  //     next: results => {
  //       this.log('GET_ITEMS NEXT >', results);
  //
  //       // Transform the data into the format used by the UI
  //       const out = results.data.items.map(fromGraph.item);
  //       this.info('watchItems NEXT >', out);
  //       o.next(out);
  //     },
  //     // NOTE: This error must be bound to `o` correctly.
  //     error: err => o.error(err),
  //   }));
  // }
}

export const ExampleServiceContext = React.createContext(undefined)
export const ExampleServiceProvider = ExampleServiceContext.Provider

export function useExampleService() {
  return React.useContext(ExampleServiceContext)
}
