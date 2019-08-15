// @flow

import * as React from 'react';
import layoutTests from '../layoutTests';
import mockSearch from '../../tests/mockSearch';
import type { Props } from './CategoriesLayout';
import { CategoriesLayout } from './CategoriesLayout';

const renderer = (): React.Element<*> => {
  const props: Props = {
    ...mockSearch,
    categories: [],
  };

  return <CategoriesLayout {...props} />;
};

layoutTests(renderer, 'CategoriesLayout');
