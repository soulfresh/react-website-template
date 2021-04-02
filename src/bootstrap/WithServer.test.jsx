import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import WithServer from './WithServer.jsx';

describe('WithServer', () => {
  let authService, history;

  beforeEach(() => {
    authService = jest.fn();
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
          history={history}
        />
      );
    });

    it('should render the home page.', () => {
      expect(screen.getByTestId('Home')).toBeInTheDocument();
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

