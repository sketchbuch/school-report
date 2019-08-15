// @flow

import * as React from 'react';
import layoutTests from '../layoutTests';
import mockSearch from '../../tests/mockSearch';
import type { Props } from './TextsLayout';
import { TextsLayout } from './TextsLayout';

const renderer = (): React.Element<*> => {
  const props: Props = {
    ...mockSearch,
    categories: [],
    curLang: 'EN',
    texts: [],
  };

  return <TextsLayout {...props} />;
};

layoutTests(renderer, 'TextsLayout');
