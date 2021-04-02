import {
  ApolloClient,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { ServiceBase } from '@thesoulfresh/utils';

import { env } from '../../env';

import { LoggingLink } from './logging-link';
import { makeGraphQLErrorLink } from './errors';
import { makeGraphQLCacheClient } from './cache';

/**
 * Use this as a base class for your Apollo base GraphQL Services.
 * It will create the Apollo client with configurations for caching,
 * handling errors, logging, setting authentication, handling authentication
 * failures and providing retry functionality.
 */
export class ApolloServiceBase extends ServiceBase {
  /**
   * @param {function} onAuthFailure - A function to call if a graph
   *   request fails with an authentication error. This should force
   *   the user to re-login.
   * @param {*} authToken - The authentication token to use with requests.
   * @param {string} [uri] - The URI to use for graph requests. This defaults
   *   the value defined in the environment variables.
   * @param {*} [client] - The Apollo client instance to use for graph
   *   requests. This is useful for configuring the service during
   *   mocking and testing.
   * @param {boolean} [verbose] - Whether to enable verbose logging.
   *   Defaults to false.
   */
  constructor(onAuthFailure, authToken, uri, client, verbose) {
    if (!client) {
      const retry = new RetryLink();

      const http = new HttpLink({
        uri,
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      const errorLink = makeGraphQLErrorLink(onAuthFailure);

      const links = [errorLink, retry, http];

      if (env.verbose) links.unshift(new LoggingLink());

      client = new ApolloClient({
        link: ApolloLink.from(links),
        cache: makeGraphQLCacheClient(),
      });
    }

    super(client, verbose);

    this.info('created with API', env.graphAPI);
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
    return this.client.clearStore();
  }
}
