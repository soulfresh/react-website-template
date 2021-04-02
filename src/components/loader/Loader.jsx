import React from 'react';
import PropTypes from 'prop-types';

import {
  combineClasses,
} from '@thesoulfresh/utils';

import styles from './Loader.module.scss';

import { ReactComponent as LoaderIcon } from './icon/loader.svg';

/**
 * `<Loader>` provides a generic loader component
 * you can use on any page. The loader will size itself
 * to fill it's parent container and center the loader
 * animation within that.
 *
 * Additional styling can be applied to the inner loader SVG
 * icon by using the `.loader` class.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @return {ReactElement}
 */
export function Loader({
  className,
  ...rest
}) {
  return (
    <div
      className={combineClasses(styles.Loader, className)}
      {...rest}
    >
      <LoaderIcon
        // Reset the id to an empty string so it doesn't
        // conflict with the page loader.
        id=""
        data-testid="loaderComponent"
        // Size the icon to fill it's parent.
        // We use the style property so we don't override
        // the default styling applied through the global loader CSS.
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}

Loader.propTypes = {
  /**
   * Any props applied to this component will be passed
   * to the root container HTMLElement.
   */
  'other props...': PropTypes.any,
};

