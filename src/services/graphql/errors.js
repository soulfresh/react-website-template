import { onError } from "@apollo/client";

/**
 * A global error handler used to handle GraphQL errors
 * before they are dispatched to individual GraphQL query
 * handlers.
 */
export function graphQLErrorHandler({
  onAuthFailure,
  graphQLErrors,
  networkError,
  operation,
  forward,
  response,
}) {
  if (graphQLErrors) {
    console.error('[GRAPHQL ERROR]:', graphQLErrors);
    for (let err of graphQLErrors) {
      if (err.extensions) {
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED':
          case 'invalid-jwt':
            onAuthFailure();

            // TODO After login, modify the operation context with
            // the new auth token and then retry the operation.
            // const oldHeaders = operation.getContext().headers;
            // operation.setContext({
            //   headers: {
            //     ...oldHeaders,
            //     authorization: getNewToken(),
            //   },
            // });
            // return forward(operation);
        }
      }
    }
  } else if (networkError) {
    console.error('[Network error]:', networkError);
    if (networkError.statusCode && networkError.statusCode === 401) {
      onAuthFailure();

      // TODO After login, modify the operation context with
      // the new auth token and then retry the operation.
    }
  }
}

/**
 * Make an apollo-link-error instance that is configured to use the
 * global error handler.
 */
export function makeGraphQLErrorLink(onAuthFailure) {
  return onError(error => graphQLErrorHandler({...error, onAuthFailure}));
}

