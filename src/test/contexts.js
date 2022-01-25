import React from 'react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

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

export function wrapWithRouterAndAnalytics(component, url, analytics) {
  return wrapWithRouter(
    wrapWithAnalytics(
      component,
      analytics,
    ),
    url
  );
}

export function wrapWithAllDependencies(component, store, url, analytics) {
  return wrapWithRouterAndAnalytics(component, url, analytics);
}