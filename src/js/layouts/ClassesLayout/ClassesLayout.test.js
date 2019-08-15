// @flow

import * as React from 'react';
import layoutTests from '../layoutTests';
import mockSearch from '../../tests/mockSearch';
import type { Props } from './ClassesLayout';
import { ClassesLayout } from './ClassesLayout';

const renderer = (): React.Element<*> => {
  const props: Props = {
    ...mockSearch,
    classes: [],
    pupils: [],
  };

  return <ClassesLayout {...props} />;
};

layoutTests(renderer, 'ClassesLayout');
