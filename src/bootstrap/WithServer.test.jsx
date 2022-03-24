import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { HTML } from '~/test';
import { AuthServiceMock, createExampleServiceClientMock } from '~/services/mocks';
import { ExampleService } from '~/services';

import WithServer from './WithServer.jsx';

describe('WithServer', () => {
  let authService, exampleService, history;

  beforeEach(() => {
    authService = new AuthServiceMock(true, true);
    exampleService = new ExampleService({
      client: createExampleServiceClientMock(),
      debug: false,
    })
    history = createMemoryHistory({
      initialEntries: ['/'],
      initialIndex: 0,
    });
  });

  describe('by default', () => {
    beforeEach(() => {
      render(
        <WithServer
          authService={authService}
          exampleService={exampleService}
          history={history}
        />
      );
    });

    it('should render the home page.', async () => {
      await HTML({testId: 'Home'}).exists();
    });
  });

  // TODO These should be implemented once you've
  // introduced your service APIs. Ideally, there should
  // be tests to verify that the desired error message/page
  // is displayed when a service failure will be fatal
  // and the user will not be able to continue.
  describe('after an auth error', () => {
    it('should call the onAuthFailure callback.', () => {});
  });

  describe('after a server error', () => {
    it('should render the not found page.', () => {});
    it('should not call the onAuthFailure callback.', () => {});
  });
});

