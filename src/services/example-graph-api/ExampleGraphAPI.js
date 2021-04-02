import React from 'react';
import { Observable } from '@apollo/client';

import * as graph from './graphql-definitions';

import { fromExampleGraph } from './fromExampleGraph';
import { toExampleGraph } from './toExampleGraph';

import { ApolloServiceBase } from '../graphql';

/*
 * Use this class to make GraphQL requests.
 */
export class ExampleGraphAPI extends ApolloServiceBase {
  // Example of getting data from the cache.
  getCachedItems() {
    const { result } = this.client.readQuery({
      query: graph.GET_ITEM,
    });
    return result;
  }

  // Example of putting data in the cache.
  updateCachedItems(items) {
    this.client.writeQuery({
      query: graph.GET_ITEM,
      data: items,
    });
  }

  // Example of watching data for changes.
  watchItems() {
    return new Observable(o => this.client.watchQuery({
      query: graph.GET_ITEMS,
      fetchResults: true,
      fetchPolicy: 'cache-first',
    }).subscribe({
      next: results => {
        this.log('ITEM NEXT >', results);

        const out = results.data.items?.map(fromExampleGraph.item);
        this.info('watchItems NEXT >', out);
        o.next(out);
      },
      // NOTE: This error must be bound to `o` correctly.
      error: err => o.error(err),
    }));
  }

  // Example of getting data from the graph.
  getItem(id) {
    this.debug('getItems', id);

    return this.client.query({
      query: graph.GET_ITEM,
      variables: { id },
    }).then(results => {
      const item = results.data.items[0];
      const out = item ? fromExampleGraph.item(item) : null;
      this.info('getItems SUCCESS', out);
      return out;
    });
  }

  // Example of updating an item in the graph and then updating the cache.
  createItem(item) {
    this.debug('createItem', ...arguments);

    return this.client.mutate({
      mutation: graph.CREATE_ITEM,
      variables: {
        item: toExampleGraph.item(item),
      },
      update: (cache, {data}) => {
        const returned = data.insert_items.returning[0];

        const items = this.getCachedItems();
        this.updateCachedItems([
          ...items,
          returned
        ]);
      }
    }).then(result => {
      const out = fromExampleGraph.item(result.data.insert_items.returning[0])
      this.info('createItem SUCCESS', out);
      return out;
    });
  }

  // Example of removing an item from the graph and updating the cache.
  removeItem(item) {
    this.debug('removeItem', ...arguments);

    return this.client.mutate({
      mutation: graph.DELETE_ITEM,
      variables: {item},
      update: (cache, {data}) => {
        const returned = data.delete_items;

        const items = this.getCachedItems();
        if (returned.affected_rows > 0) {
          const updated = items.filter(i => i.id === item.id);
          this.updateCachedItems(updated);
        }
      }
    }).then(results => {
      this.info('removeItem SUCCESS', results);
      // No need to normalize because we are returning the original argument.
      return item;
    });
  }
}

export const ExampleGraphAPIContext = React.createContext();
// Use this provider to inject the service into the application in the
// WithServer or WithMocks file.
export const ExampleGraphAPIProvider = ExampleGraphAPIContext.Provider;

/**
 * This hook allows you to get the graph service instance
 * injected into the application.
 * @return {ExampleGraphAPI}
 */
export function useExampleGraphAPI() {
  return React.useContext(ExampleGraphAPIContext);
}

/**
 * Generates an ExampleGraphAPI instance whenever the parameters change.
 * Use this in the `WithServer` and `WithMocks` components to create
 * the service instance injected into the application.
 *
 * @param {function} onAuthFailure - A function to call if a graph
 *   request fails due to an authentication issue. This will force
 *   the user to re-login.
 * @param {*} authToken - The user's current authentication token
 *   to use in making authenticated requests.
 * @param {*} [client] - The GraphQL client object to use for making
 *   GraphQL requests. This is useful for testing or running with mocks.
 * @return {object} The GraphQL service to inject into the application.
 */
export function useCreateExampleGraphAPI(onAuthFailure, authToken, uri, client) {
  return React.useMemo(() => {
    return new ExampleGraphAPI(onAuthFailure, authToken, uri, client);
  }, [authToken, onAuthFailure, uri, client]);
}

