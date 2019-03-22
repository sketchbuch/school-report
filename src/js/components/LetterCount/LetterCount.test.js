// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import LetterCount from './LetterCount';

describe('<LetterCount />', () => {
  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LetterCount count="5" />, div);
  });
});
