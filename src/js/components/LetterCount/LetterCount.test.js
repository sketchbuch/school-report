// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import LetterCount from './LetterCount';
import type { Props } from './LetterCount';

describe('<LetterCount />', () => {
  const props: Props = {
    count: '5',
  };

  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LetterCount {...props} />, div);
  });
});
