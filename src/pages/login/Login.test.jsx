import React from 'react';
import { render, screen } from '@testing-library/react';

import { Login } from './Login.jsx';

class Selectors {
  get container() {
    return screen.getByTestId('Login');
  }
}
const selectors = new Selectors();

describe('Login', function() {
  beforeEach(() => {
    render(
      <Login
      />
    );
  });

  it('should render the page.', () => {
    expect(selectors.container).toBeInTheDocument();
  });
});
