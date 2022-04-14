import React from 'react';
// eslint-disable-next-line no-unused-vars
// import PropTypes from 'prop-types';
import { combineClasses } from '@thesoulfresh/utils';
import { useProcessEvent } from '@thesoulfresh/react-tools';

import { TitleXL } from '~/components';
import { useGraphQLService } from '~/services';
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
  user,
  ...rest
}) {
  return (
    <div data-testid="Home"
      className={combineClasses(styles.Home, className)}
      {...rest}
    >
      <TitleXL>Welcome Home!</TitleXL>
      {user &&
        `User is: ${user.firstName} ${user.lastName}`
      }
      {!user && "loading user..."}
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
  const [user, setUser] = React.useState();
  const api = useGraphQLService();
  const handleEvent = useProcessEvent();

  React.useEffect(() => {
    // Use your API here
    api.getUsers().then(handleEvent(u => {
      if (!env.test) console.log('Got the users:', u)
      if (u.length > 0) {
        setUser(u[0]);
      }
    }));
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Only dumb components deeper in this tree...
  return (
    <Home user={user} />
  );
}

