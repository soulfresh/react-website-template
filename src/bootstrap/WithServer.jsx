import React from 'react';
import queryString from 'query-string';

import { env } from '../env';
// import {
//   ExampleGraphAPI,
//   useCreateExampleGraphAPI,
//   ExampleGraphAPIProvider,
// } from '~/services';

import { Main } from './Main.jsx';

/**
 * Create an options object to pass to the service
 * factories by merging the options passed and
 * any query parameters in the URL.
 * @param {object} options - Mock options
 * @return {object} options that include any query
 *   parameters in the browser URL.
 */
// eslint-disable-next-line no-unused-vars
function makeServiceFactoryOptions(options) {
  // Merge any query params from the URL into the generator
  // options so we can configure the app using query params.
  const params = queryString.parse(window.location.search);
  for (let key in params) {
    if (params[key] === 'true') {
      params[key] = true;
    } else if (params[key] === 'false') {
      params[key] = false;
    }
  }

  const out = {
    ...options,
    ...params,
  };

  if (!env.test && !env.production) console.log('service factory options:', out);
  return out;
}

/**
 * Render the application with live services.
 * @param {object} props
 * @param {*} [props.authResponse] - The response from the authentication service.
 * @param {function} [props.onLogout] - A callback function that will log the user out.
 * @param {function} [props.onAuthFailure] - A callback function to call when the user's
 *   session expires.
 * @param {object} [props.history] - Override the history object.
 * @param {...*} [props.rest] - Anything else you need to pass through to the main app.
 */
export default function WithServer({
  // Allow passing any services during testing
  // xService,
  ...rest
}) {
  // Merge URL query prameters with any factory options
  // passed in.
  // const options = makeServiceFactoryOptions();

  // Construct service API clients here...

  if (!env.production) {
    if (!env.test) console.info('-- API clients have been made available globally --');
    // Provide global access to the clients for debugging and experimenting.
    // window.xAPI = xClient;
  }

  // Wrap the `Main` component in any API context providers...
  return (
    <Main {...rest} />
  );
}

