// @flow

import * as React from 'react';
import classDefault, { ClassFactory } from '../../types/class';
import mockRouter from '../../tests/mockRouter';
import mockSearch from '../../tests/mockSearch';
import type { ClassType } from '../../types/class';
import type { Props } from './PupilsLayout';
import { PupilsLayout } from './PupilsLayout';
import layoutTests from '../layoutTests';

const renderer = (): React.Element<*> => {
  const activeClass: ClassType = ClassFactory({ ...classDefault }, Date.now());
  const props: Props = {
    ...mockRouter,
    ...mockSearch,
    activeClass,
    pupils: [],
  };

  return <PupilsLayout {...props} />;
};

layoutTests(renderer, 'PupilsLayout');
