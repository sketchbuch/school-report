// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import NoData from './NoData';
import store from '../../store/redux';

describe('<NoData />', () => {
  const props = {
    dispatch: jest.fn(),
    store: store,
    curLang: 'EN',
  };

  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NoData {...props} />, div);
  });
});
