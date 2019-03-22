// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import AppError from './AppError';
import type { Props } from './AppError';

describe('<AppError />', () => {
  const props: Props = {
    errorTxt: 'Error Loading',
  };

  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppError {...props} />, div);
  });
});
