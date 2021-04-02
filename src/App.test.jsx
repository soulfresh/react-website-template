import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  let authService, user;

  beforeEach(() => {
    authService = {
      getUser: jest.fn(),
      authenticate: jest.fn(),
    };
    user = {user: 'Bob'};
  });

  describe('using the login page functionality', () => {
    describe('initially logged in', () => {
      beforeEach(async () => {
        authService.getUser.mockReturnValue(Promise.resolve(user));

        render(<App authService={authService} overlay={false} />);

        await screen.findByTestId('Main');
      });

      it('should render the main app.', () => {
        expect(screen.getByTestId('Main')).toBeInTheDocument();
      });

      it('should not render the login page.', () => {
        expect(screen.queryByTestId('Login')).not.toBeInTheDocument();
      });
    });

    describe('initially logged out', () => {
      beforeEach(() => {
        authService.getUser.mockReturnValue(Promise.resolve(null));

        render(<App authService={authService} overlay={false} />);
      });

      it('should render the login page.', () => {
        expect(screen.getByTestId('Login')).toBeInTheDocument();
      });

      it('should not bootstrap the main app yet.', () => {
        expect(screen.queryByTestId('Main')).not.toBeInTheDocument();
      });

      describe('after login', () => {
        beforeEach(async () => {
          authService.authenticate.mockReturnValue(Promise.resolve(user));

          userEvent.click(screen.getByText('Login'));

          await screen.findByTestId('Main');
        });

        it('should render the main app.', () => {
          expect(screen.getByTestId('Main')).toBeInTheDocument();
        });

        it('should remove the login page.', () => {
          expect(screen.queryByTestId('Login')).not.toBeInTheDocument();
        });

        // TODO Implement these tests once your application has
        // implemented a service that could fail if the session
        // times out.
        describe('and the users session expires', () => {
          beforeEach(() => {
            // 1. Setup a service mock that will fail with an auth error.
            // 2. Perform an action that will trigger the service to fail.
          });

          xit('should render the login page.', () => {});
          xit('should destroy the main app.', () => {});
        });

        describe('and then logging out', () => {
          beforeEach(async () => {
            userEvent.click(screen.getByText('Logout'));

            await screen.findByTestId('Login');
          });

          it('should render the login page.', () => {
            expect(screen.getByTestId('Login')).toBeInTheDocument();
          });

          it('should remove the main app entirely.', () => {
            expect(screen.queryByTestId('Main')).not.toBeInTheDocument();
          });
        });
      });
    });
  });

  describe('using the login overlay functionality', () => {
    describe('initially logged in', () => {
      beforeEach(async () => {
        authService.getUser.mockReturnValue(Promise.resolve(user));

        render(<App authService={authService} overlay={true} />);

        await screen.findByTestId('Main');
      });

      it('should render the main app.', () => {
        expect(screen.getByTestId('Main')).toBeInTheDocument();
      });

      it('should not render the login page.', () => {
        expect(screen.queryByTestId('Login')).not.toBeInTheDocument();
      });
    });

    describe('initially logged out', () => {
      beforeEach(() => {
        authService.getUser.mockReturnValue(Promise.resolve(null));

        render(<App authService={authService} overlay={true} />);
      });

      it('should render the login page.', () => {
        expect(screen.getByTestId('Login')).toBeInTheDocument();
      });

      it('should not bootstrap the main app yet.', () => {
        expect(screen.queryByTestId('Main')).not.toBeInTheDocument();
      });

      describe('after login', () => {
        beforeEach(async () => {
          authService.authenticate.mockReturnValue(Promise.resolve(user));

          userEvent.click(screen.getByText('Login'));

          await screen.findByTestId('Main');
        });

        it('should render the main app.', () => {
          expect(screen.getByTestId('Main')).toBeInTheDocument();
        });

        it('should remove the login page.', () => {
          expect(screen.queryByTestId('Login')).not.toBeInTheDocument();
        });

        // TODO Implement these tests once your application has
        // implemented a service that could fail if the session
        // times out.
        describe('and the users session expires', () => {
          beforeEach(() => {
            // 1. Setup a service mock that will fail with an auth error.
            // 2. Perform an action that will trigger the service to fail.
          });

          xit('should render the login page.', () => {});
          xit('should retain the main app.', () => {});
        });

        describe('and then logging out', () => {
          beforeEach(async () => {
            userEvent.click(screen.getByText('Logout'));

            await screen.findByTestId('Login');
          });

          it('should render the login overlay.', () => {
            expect(screen.getByTestId('Login')).toBeInTheDocument();
          });

          // In this case, we want to ensure that the state
          // is completely recreated so we don't accidentally
          // reveal the previous user data to the next user.
          it('should remove the main app entirely.', () => {
            expect(screen.queryByTestId('Main')).not.toBeInTheDocument();
          });
        });
      });
    });
  });
});

