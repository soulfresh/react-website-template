import React from 'react';
import PropTypes from 'prop-types';

import { combineClasses } from '@thesoulfresh/utils';

import styles from './Action.module.scss';

import { AnalyticsAction, RoutedAction } from '@thesoulfresh/react-tools';


/**
 * @typedef {object} ActionProps
 * @property {*} [ref]
 */

/**
 * The `Action` component allows you to render either a `<button>` or
 * an `<a>` element depending on the `button` prop. This makes it easy
 * to switch between links and buttons without having to change much
 * markup. Additionally, styling is independent of function so you can render
 * a button that looks like a link or vice versa.
 *
 * By default link actions (ie. without the `button` prop) are routed by
 * React Router. You can force a link to be unrouted by passing either the
 * `unrouted` or `blank` props.
 *
 * `Action` can also perform analytics tracking of events and external links.
 * External link tracking is automatically performed for all links with the
 * `blank` or `unrouted` props.
 *
 * To perform user event tracking, simply specify the `category`,
 * `action`, `label` and (optionally) `value` props. See the prop type descriptons
 * for more details.
 */
export const Action = React.forwardRef(({
  button = false,
  solid = false,
  pill = false,
  transparent = false,
  unstyled = false,
  className,
  display,
  feel,
  size,
  boxy = false,
  children,
  ...rest
}, ref) => {
  const props = {
    className: combineClasses(
      styles.Action,
      styles.UnstyledButton,
      className,
      solid ? styles.solid : null,
      pill ? styles.pill : null,
      transparent ? styles.transparent : null,
      className,
      display = display
        ? styles[display]
        : button
          ? styles.button
          : styles.link,
      feel ? styles[feel] : null,
      size ? styles[size] : null,
      boxy ? styles.boxy : null,
      unstyled ? null : styles.styled,
      !!children ? styles.withChildren : null,
    ),
    display,
    feel,
    size,
    button,
    children,
    ...rest,
  };

  return (
    <AnalyticsAction {...props}>
      <RoutedAction {...props} ref={ref} />
    </AnalyticsAction>
  );
});


Action.propTypes = {
  /**
   * If true, render a `<button>` element. Otherwise,
   * render an `<a>` element.
   */
  button: PropTypes.bool,
  /**
   * Either an object as accepted by React Router or a string to
   * use as an href. Only useful if you are rendering a link.
   * See https://reactrouter.com/web/api/Link/to-object for React
   * Router docs.
   */
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /**
   * You can use `href` in place of the `to` prop but it must be a string.
   * This is only used when rendering a link and `to` takes precedence.
   */
  href: PropTypes.string,
  /**
   * __true__: set `target="_blank" rel="noopener noreferrer"`.
   * __false__: link internally using react router.
   * Only useful when rendering links.
   */
  blank: PropTypes.bool,
  /**
   * __true__: force this link to be a standard HTML link that will not
   * be routed by React Router. Only usefull when rendering links.
   */
  unrouted: PropTypes.bool,
  /**
   * Render the link/button without the default button styles
   * for cases where you need custom styling of the action. This
   * is also useful for cases where you want to wrap arbitrary elements
   * in an anchor link without applying link/button styling to those
   * elements.
   */
  unstyled: PropTypes.bool,
  /**
   * The role of this action. "Secondary" is the same as not passing
   * a display.
   */
  feel: PropTypes.oneOf(['primary', 'secondary', 'success', 'warn', 'error']),
  /**
   * Whether this action should look like a action or a link.
   * The default is set depending on the `button` prop such that
   * buttons look like buttons by default and links look like links.
   */
  display: PropTypes.oneOf(['button', 'link']),
  /**
   * Whether a "button" feel action has a solid background.
   */
  solid: PropTypes.bool,
  /**
   * Whether a "button" feel action has a pill shape.
   */
  pill: PropTypes.bool,
  /**
   * Whether this "button" feel action should have a transparent background.
   * This is only applicable when using the action feel.
   */
  transparent: PropTypes.bool,
  /**
   * Whether this "button" feel action should remove the rounded corners.
   * This is useful when you need the action to fit nicely
   * in a box layout.
   */
  boxy: PropTypes.bool,
  /**
   * Sets the size of the content to small, medium or large.
   */
  size: PropTypes.oneOf(['s', 'm', 'l']),
  /**
   * Analytics event tracking category. This is only used
   * by button actions and event tracking will only occur
   * if category, action and label are all supplied.
   * See https://github.com/react-ga/react-ga#reactgaeventargs
   */
  category: PropTypes.string,
  /**
   * Analytics event tracking action. This is only used
   * by button actions and event tracking will only occur
   * if category, action and label are all supplied.
   * See https://github.com/react-ga/react-ga#reactgaeventargs
   */
  action: PropTypes.string,
  /**
   * Analytics event tracking label. This is only used
   * by button actions and event tracking will only occur
   * if category, action and label are all supplied.
   * See https://github.com/react-ga/react-ga#reactgaeventargs
   */
  label: PropTypes.string,
  /**
   * Analytics event tracking value. This is only used
   * by button actions and event tracking will only occur
   * if category, action and label are all supplied.
   * See https://github.com/react-ga/react-ga#reactgaeventargs
   */
  value: PropTypes.number,
  /**
   * Any other props will be passed through to the underlying
   * `<a>` or `<button>` elements or the `RouterLink` if for
   * routed links.
   */
  '...other props': PropTypes.any,
};

