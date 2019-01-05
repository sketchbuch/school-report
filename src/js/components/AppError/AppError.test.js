// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import AppError from './AppError';

describe('<AppError />', () => {
  const props = {
    errorTxt: 'Error Loading',
  };

  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppError {...props} />, div);
  });
});
