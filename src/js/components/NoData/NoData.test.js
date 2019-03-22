// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import NoData from './NoData';
import type { Props } from './NoData';

describe('<NoData />', () => {
  const props: Props = {
    dispatch: jest.fn(),
    curLang: 'EN',
  };

  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NoData {...props} />, div);
  });
});
