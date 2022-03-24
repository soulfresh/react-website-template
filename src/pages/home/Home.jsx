import React from 'react';
// eslint-disable-next-line no-unused-vars
// import PropTypes from 'prop-types';
import { combineClasses } from '@thesoulfresh/utils';

import { TitleXL } from '~/components';
import { useExampleService } from '~/services';
import {env} from '~/env';

import styles from './Home.module.scss';

/**
 * This is the home page of the app.
 *
 * @param {object} props
 * @param {string} [props.className]
 */
export function Home({
  className,
  onGetUsers,
  ...rest
}) {
  return (
    <div data-testid="Home"
      className={combineClasses(styles.Home, className)}
      {...rest}
    >
      <TitleXL>Welcome Home!</TitleXL>
    </div>
  );
}

Home.propTypes = {
};

/**
 * @param {object} props
 */
// eslint-disable-next-line no-empty-pattern
export function HomeConnected({
  // history,
  // location,
  // match,
}) {
  const api = useExampleService();

  React.useEffect(() => {
    // Use your API here
    api.getUsers().then(u => {
      if (!env.test) console.log('Got the users:', u)
    });
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Only dumb components deeper in this tree...
  return (
    <Home />
  );
}

