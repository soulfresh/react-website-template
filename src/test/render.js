import React from 'react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render as renderer } from '@testing-library/react';

import {
  Analytics,
  AnalyticsProvider,
} from '~/services/analytics';

export function wrapWithRouter(
  component,
  url,
  history
) {
  if (!history) {
    const initialEntries = Array.isArray(url)
      ? url
      : url != null
      ? [url]
      : undefined;
    history = createMemoryHistory({
      initialEntries,
      initialIndex: 0,
    });
  }

  return (
    <Router history={history}>
      <Route
        render={props => {
          const next = {...props};
          // Remove the staticContext prop because that's currently
          // never used in the app. However, if we start using it,
          // we should find another way to prevent the error logs:
          // "React does not recognize the `staticContext` prop on a DOM element."
          delete next.staticContext;
          return React.cloneElement(component, next);
        }}
      />
    </Router>
  );
}

/**
 * @param {any} component
 * @param {object} [options]
 * @param {string} [options.url]
 * @param {string[]} [options.history] - List of URLs in history
 */
export function renderWithRouter(component, {url, history, ...rest} = {}) {
  return renderer(wrapWithRouter(component, url, history), rest);
}

export function wrapWithAnalytics(
  component,
  analytics = new Analytics({testMode: true, verbose: false}),
) {
  return (
    <AnalyticsProvider value={analytics}>
      { component }
    </AnalyticsProvider>
  );
}

/**
 * @param {any} component
 * @param {object} [options]
 * @param {object} [options.analytics] - The analytics service mock to use.
 */
export function renderWithAnalytics(component, {analytics, ...rest} = {}) {
  return renderer(wrapWithAnalytics(component, analytics), rest);
}

export function wrapWithRouterAndAnalytics(component, url, analytics) {
  return wrapWithRouter(
    wrapWithAnalytics(
      component,
      analytics,
    ),
    url
  );
}

/**
 * @param {any} component
 * @param {object} [options]
 * @param {string} [options.url]
 * @param {string[]} [options.history] - List of URLs in history
 * @param {object} [options.analytics] - The analytics service mock to use.
 */
export function renderWithRouterAndAnalytics(component, {url, analytics, ...rest} = {}) {
  return renderer(wrapWithRouterAndAnalytics(component, url, analytics), rest)
}

export function wrapWithAllDependencies(component, store, url, analytics) {
  return wrapWithRouterAndAnalytics(component, url, analytics);
}

/**
 * @param {any} component
 * @param {object} [options]
 * @param {object} [options.analytics] - The analytics service mock to use.
 */
export function renderWithAllDeps(component, options = {}) {
  return renderWithRouterAndAnalytics(component, options)
}

