// @flow

import { Location, Match } from 'react-router';

/**
 * Misc types
 */

export type FuncCompReturn = React.Element<*>;
export type RenderHelperReturn = React.Element<*>;
export type ReactRouterProps = {
  location: Location,
  match: Match,
  path: Location,
};
