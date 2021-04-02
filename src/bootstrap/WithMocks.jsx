import React from 'react';
import queryString from 'query-string';

import {
  env,
} from '../env';
// import {
//   ExampleGraphAPI,
//   useCreateExampleGraphAPI,
//   ExampleGraphAPIProvider,
// } from '~/services';

import { Main } from './Main.jsx';

/**
 * Create an options object to pass to the mock
 * factory by merging the options passed and
 * any query parameters in the URL.
 * @param {object} options - Mock options
 * @return {object} options that include any query
 *   parameters in the browser URL.
 */
// eslint-disable-next-line no-unused-vars
function makeMockFactoryOptions(options) {
  // Merge any query params from the URL into the generator
  // options so we can configure the app using query params.
  const params = queryString.parse(window.location.search);
  for (let key in params) {
    // Convert *Count params into numbers
    if (/Count$/.test(key)) {
      params[key] = Number(params[key]);
    } else if (params[key] === 'true') {
      params[key] = true;
    } else if (params[key] === 'false') {
      params[key] = false;
    }
  }

  const isTest = env.environment === 'test';
  const out = {
    ...options,
    // Allow holes in the API data.
    allowEmptyEntities: !isTest,
    // Use realistic images.
    useRealImages: !isTest,
    // Randomize item counts.
    randomize: !isTest,
    ...params,
  };

  if (!env.test) console.log('[MOCK] generator options:', out);
  return out;
}

/**
 * Render the application with mock services.
 *
 * This component can be used directly in integration tests.
 *
 * @param {object} props
 * @param {object} [props.mockOptions] - Options that can be passed to
 *   mock service factories to configure how those services are mocked.
 * @param {*} [props.authResponse] - The response from the authentication service.
 * @param {function} [props.onLogout] - A callback function that will log the user out.
 * @param {function} [props.onAuthFailure] - A callback function to call when the user's
 *   session expires.
 * @param {object} [props.history] - Override the history object.
 * @param {...*} rest - Anything else you need to pass through to the main app.
 * @return {ReactElement}
 */
export default function WithMocks({
  mockOptions,
  // Allow passing services during testing...
  // xService,
  ...rest
}) {
  // Merge URL query prameters with any mock factory options
  // passed in.
  // const options = makeMockFactoryOptions(mockOptions);

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
