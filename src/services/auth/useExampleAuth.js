import React from 'react';
import ReactDOM from 'react-dom';

import { ExampleAuth } from './ExampleAuth.js';

/**
 * This hook stores the user's authenticated state and provides
 * login, logout and forgot login callbacks. Internally it uses
 * an auth service to perform the authentication steps.
 *
 * @param {*} [authService] - overrides the default auth service instance.
 */
// TODO Rename useAuth
export function useExampleAuth(
  authService,
) {
  // Either use the auth service provided (for testing)
  // or generate one that gets reused between calls.
  const [service] = React.useState(() => authService || new ExampleAuth());
  const [initialized, setInitialized] = React.useState(false);
  const [authResponse, setAuthResponse] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const onLogout = () => {
    // Do any logout work you need to perform here...

    // In case logout is kicked off from a non-React
    // based event, ensure that our state updates are batched.
    ReactDOM.unstable_batchedUpdates(() => {
      // Clear the auth data.
      setAuthResponse(null);
      // Ensure that the initialized state is reset so that
      // no state is leaked to the next user.
      setInitialized(false);
    });
  };

  const onLogin = async (...args) => {
    // FYI, the loading state is not managed in this
    // function because it is dependent on the design of the login
    // page so it needs to be the Login page's responsibility.
    const response = await service.authenticate(...args);

    ReactDOM.unstable_batchedUpdates(() => {
      if (response) {
        setAuthResponse(response);
        // We have been authenticated at least once now.
        setInitialized(true);
      } else {
        setAuthResponse(null);
      }
    });
  };

  // This is similar to `onLogin` but should be used when
  // the user's session expires and you are using the `<LoginOverlay>`
  // component. This function should NOT flip the initialized
  // flag because that will cause the main app bundle to be
  // reloaded.
  const onRefreshLogin = async (...args) => {
    // Clearing the auth flag?
    // setAuthResponse(null);

    const response = await service.authenticate(...args);

    ReactDOM.unstable_batchedUpdates(() => {
      if (response) {
        setAuthResponse(response);
        // FYI Do NOT flip the `initialized` flag here.
      } else {
        setAuthResponse(null);
      }
    });
  };

  const onForgotLogin = () => {
    console.log('Not yet implemented 🤬');
  };

  // Do whatever is necessary to get the user's
  // initial authenticated state.
  React.useEffect(() => {
    service.getUser().then(response => {
      ReactDOM.unstable_batchedUpdates(() => {
        // If the user is authenticated, set the correct state
        // so the app removes the login window and shows the
        // main app.
        if (response) {
          setLoading(false);
          setInitialized(true);
          setAuthResponse(response);
        }
        // If the user is not authenticated, ensure that
        // the login page is shown and the loader is removed.
        // Allow the existing initialized state to persist
        // unless you specifically want to reset the
        // full application state.
        else {
          setLoading(false);
          // If they are not authenticated, ensure the
          // auth response data is cleaned up.
          setAuthResponse(null);
        }
      });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Here we use the presence of auth response data
  // to indicate whether the user is currently authenticated
  // but this will vary based on your needs.
  const authenticated = !!authResponse;

  // How you implement authentication is up to you but
  // the following API is expected.
  return {
    // Whether the user has been authenticated at least
    // once during the session. The main app bundle will
    // not be loaded until this flag is set to true.
    //
    // IMPORTANT: This should be reset to false when the
    // user explicitly logs out. This way the application
    // state will be fully refreshed on the next login
    // ensuring that the first user's data is never exposed
    // to the next user.
    initialized,
    // Whether the user is currently authenticated. When
    // this flag is false, the login screen is shown.
    authenticated,
    // Whether the authentication service is currently working
    // to authenticate the user. When this flag is true,
    // the page loader is shown.
    loading,
    // This can be user data or whatever you get back from
    // your authentication service.
    authResponse,
    // A function to log the user out.
    onLogout,
    // A function to log the user in.
    onLogin,
    // A function to refresh the authenticated state of the user
    // without toggling the `initialized` flag. When using
    // the LoginOverlay component, using this function allows
    // you to maintain the application state during the re-authentication
    // process.
    onRefreshLogin,
    // A function to handle the case that the user needs
    // help logging in. For example, this might send a
    // forgot password email or sms.
    onForgotLogin,
  };
}
