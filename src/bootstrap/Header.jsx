import React from 'react';

import { Action } from '~/components';

/**
 * The header content of your application.
 */
export function Header({
  onLogout,
}) {
  return (
    <Action button onClick={onLogout}>Logout</Action>
  );
}
