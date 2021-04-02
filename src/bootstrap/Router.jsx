import React from 'react';
import {
  Router as ReactRouter,
  Route,
  Switch
} from "react-router-dom";

import { BundleLoadError } from './BundleLoadError.jsx';
import { getRoute, history as browserHistory } from './routes';
import { NotFoundConnected, HomeConnected } from '~/pages';
import { PageLayout, loaderService } from '~/components';

/**
 * Wrap each page in the generic page layout.
 * @param {*} component - the component to wrap.
 * @return {*} The PageLayout with your component.
 */
function wrapPage(component) {
  // Configure consistent styling across all pages.
  return (
    <PageLayout>{ component }</PageLayout>
  );
}

/**
 * @param {object} props
 * @param {object} props.history - The history object to pass to ReactRouter.
 *   This can be an in memory history object during tests.
 * @param {*} [props.authResponse] - The response from the authentication service.
 * @param {function} [props.onLogout] - A callback function that will log the user out.
 * @param {function} [props.onAuthFailure] - A callback function to call when the user's
 *   session expires.
 * @param {...*} rest - Anything else you need to pass through to each page.
 * @return {ReactElement}
 */
export function Router({
  history = browserHistory,
  ...rest
}) {
  // Stop the loader animation embedded in the index page.
  loaderService.stop();

  return (
    <BundleLoadError
      message="An error occurred loading the current page."
      directions="Please contact the development team with the steps you took before this error occured."
    >
      <ReactRouter history={history}>
        <Switch>
          <Route
            path={getRoute('HOME')}
            exact
            render={props => wrapPage(
              <HomeConnected {...props} {...rest} />
            )}
          />
          <Route
            render={props => wrapPage(
              <NotFoundConnected {...props} {...rest} />
            )}
          />
        </Switch>
      </ReactRouter>
    </BundleLoadError>
  );
}

