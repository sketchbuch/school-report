// @flow

import type { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';

/**
 * Breadcrumb type def.
 */

export type Breadcrumb = {
  id: string,
  link: string,
  text: string,
};

export type BreadcrumbMapObj = {
  param: string,
  route: string,
  stateKey: string,
  trans?: string,
};

export type BreadcrumbProps = {
  ...RouteComponentProps,
  breadcrumbs: Breadcrumb[],
  dispatch: Dispatch,
};
