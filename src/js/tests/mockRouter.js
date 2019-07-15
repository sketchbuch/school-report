// @flow

import { match, RouteChildrenProps } from 'react-router';
import * as H from 'history';

export const mockLocation: H.Location = {
  pathname: '',
  search: '',
  state: {},
  hash: '',
};

export const mockHistory: H.History = {
  length: 0,
  action: 'PUSH',
  location: { ...mockLocation },
  push: () => {},
  replace: () => {},
  go: () => {},
  goBack: () => {},
  goForward: () => {},
  block: () => {},
  listen: () => {},
  createHref: () => {},
};

export const mockMatch: match = {
  params: {},
  isExact: false,
  path: '',
  url: '',
};

const mockRouter: RouteChildrenProps = {
  history: { ...mockHistory },
  location: { ...mockLocation },
  match: { ...mockMatch },
};

export default mockRouter;
