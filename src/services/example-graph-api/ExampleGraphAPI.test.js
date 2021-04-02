import {
  makeGraphQLErrorLink,
} from '../graphql';
import {
  ExampleGraphAPI,
  createExampleGraphClientMock,
} from './ExampleGraphAPI';
import { generateExampleGraphAPI as generate } from './mocks';

describe('ExampleGraphAPI', function() {
  let client, api, onAuthFailure, item;
  const authToken = 'i-am-the-key-master';
  const endpoint = 'foo.co/graphql/v1';

  beforeEach(function() {
    onAuthFailure = jest.fn();
    item = generate.item({includeId: true});

    client = createExampleGraphClientMock(
      makeGraphQLErrorLink(onAuthFailure),
      {
        query_root: () => ({
          items: () => [item]
        })
      }
    );
    // eslint-disable-next-line no-unused-vars
    api = new ExampleGraphAPI(onAuthFailure, authToken, endpoint, client);

    jest.spyOn(client, 'query');
    jest.spyOn(client, 'mutate');
  });

  // Example tests
  describe('getItem', () => {
    xit('should set the correct variables for the query.', async () => {
      await api.getItem();
      expect(client.query).toHaveBeenCalledTimes(1);
      expect(client.query).toHaveBeenCalledWith(jest.objectContaining({
        variables: {}
      }));
    });
  });
});
