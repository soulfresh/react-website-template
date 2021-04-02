import {
  graphQLErrorHandler,
} from '../graphql';

describe('graphQLErrorHandler', function() {
  let errorParams, onAuthFailure;

  beforeEach(function() {
    onAuthFailure = jest.fn();
    errorParams = {
      onAuthFailure,
      graphQLErrors: [],
      networkError: {},
      operation: {},
      forward: {},
      response: {},
    };
  });

  it('should call the auth handler on an auth failure.', () => {
    // silence error logs for this test.
    jest.spyOn(console, 'error').mockImplementation(() => {});

    graphQLErrorHandler({
      ...errorParams,
      graphQLErrors: [{
        extensions: {
          code: 'UNAUTHENTICATED'
        }
      }]
    });

    expect(onAuthFailure).toHaveBeenCalledTimes(1);
  });
});
