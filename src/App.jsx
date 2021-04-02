import React from 'react';

// Import the following components directly so we don't accidentally
// import anything unnecessary.
import { LoginConnected } from './pages/login/Login.jsx';
import { PageLoader } from './components/loader/PageLoader.jsx';
import { env } from './env';
import { useExampleAuth } from './services/auth';

env.log();

// Lazy load the main App bundle so it's not required
// for login.
// Also, create two separate bundles so we don't bloat
// the production app with mock data.
const Main = env.mock
  ? React.lazy(() => import('./bootstrap/WithMocks.jsx'))
  : React.lazy(() => import('./bootstrap/WithServer.jsx'));

/**
 * Display the login page as an overlay above the main application
 * bundle.
 *
 * @param {object} props
 * @param {boolean} [props.loading] - Whether the authentication mechanism is
 *   currently running
 * @param {boolean} [props.authenticated] - Whether the user is authenticated.
 * @param {*} [props.authResponse] - The response from the authentication service.
 * @param {function} [props.onLogin] - A callback function to authenticate the user.
 * @param {function} [props.onForgotLogin] - A callback for when the user needs
 *   help signing in (ex. send a forgot password email or sms).
 * @param {function} [props.onLogout] - A callback function that will log the user out.
 * @param {function} [props.onAuthFailure] - A callback function to call when the user's
 *   session expires.
 * @param {object} [props.history] - Override the history object.
 * @return {ReactElement}
 */
export function LoginOverlay({
  loading, // trap this so it's not passed to the Main component.
  initialized,
  authenticated,
  onLogin,
  onForgotLogin,
  ...rest
}) {
  return (
    <>
      {!authenticated &&
        <LoginConnected onLogin={onLogin} onForgotLogin={onForgotLogin} />
      }
      {initialized &&
        <React.Suspense fallback={<PageLoader />}>
          <Main {...rest} />
        </React.Suspense>
      }
    </>
  );
}


/**
 * When the user is not authenticated, replace the main app bundle
 * with the login page. This will recreate the application state
 * on reauth.
 *
 * @param {object} props
 * @param {boolean} [props.loading] - Whether the authentication mechanism is
 *   currently running
 * @param {boolean} [props.authenticated] - Whether the user is authenticated.
 * @param {*} [props.authResponse] - The response from the authentication service.
 * @param {function} [props.onLogin] - A callback function to authenticate the user.
 * @param {function} [props.onForgotLogin] - A callback for when the user needs
 *   help signing in (ex. send a forgot password email or sms).
 * @param {function} [props.onLogout] - A callback function that will log the user out.
 * @param {function} [props.onAuthFailure] - A callback function to call when the user's
 *   session expires.
 * @param {object} [props.history] - Override the history object.
 * @return {ReactElement}
 */
export function LoginPage({
  loading, // trap this so it's not passed to the Main component.
  authenticated,
  onLogin,
  onForgotLogin,
  ...rest
}) {
  if (!authenticated) {
    return (
      <LoginConnected onLogin={onLogin} onForgotLogin={onForgotLogin} />
    );
  }
  else {
    return (
      <React.Suspense fallback={<PageLoader />}>
        <Main {...rest} />
      </React.Suspense>
    );
  }
}

/**
 * The root of the application. It will render either:
 * 1) The page loader while it is trying to authenticate the user.
 * 2) The login page if the user is not yet authenticated.
 * 3) Either the mock or live application bundles depending on
 *    the type of build.
 *
 * By providing the authentication functionality at this level,
 * we minimize the size of the initial bundle in the case that
 * the user needs to authenticate.
 *
 * The login page can be rendered either as an overlay on top of
 * the main app bundle or as a page replacing the main app. Using
 * the overlay has the advantage that the application state is
 * maintained if the user's authenticated state changes during
 * their session. However, this can cause additional complexity
 * and may not work with all authentication mechanisms. In those
 * situations, you can switch to the page based login version.
 * This will remove the app bundle and will fully rebuild the
 * application state after reauth.
 *
 * @param {object} props
 * @param {boolean} [props.overlay] - Whether to render the login
 *   page as an overlay.
 * @param {object} [props.history] - Override the history object.
 * @param {object} [props.authService] - Override the auth service.
 * @return {ReactElement}
 */
export default function App({
  overlay = true,
  authService,
  // Any services can be provided to the application
  // through props
  ...rest
}) {
  const auth = useExampleAuth(authService);

  const props = {
    ...auth,
    ...rest,
    onSuccess: () => console.log('Authentication not implemented yet.'),
    // Use this callback to handle the case that the user
    // made a request and their authentication is no longer
    // valid. By default, this will simply log out the user
    // but you may need to handle this differently based on
    // your authentication mechanism.
    onAuthFailure: auth.onLogout,
  };

  return overlay
    ? <LoginOverlay {...props} />
    : <LoginPage {...props} />;
}

