// @flow

import * as React from 'react';
import type { Dispatch } from 'redux';
import { RouteChildrenProps } from 'react-router';
import DeleteCategoriesLayout from '../../../../layouts/CategoriesLayout/Delete/DeleteCategoriesLayout';

export const Delete = (routerProps: RouteChildrenProps, dispatch: Dispatch): React.Node => {
  return <DeleteCategoriesLayout {...routerProps} dispatch={dispatch} />;
};
