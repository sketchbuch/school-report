// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import LetterCount from './LetterCount';

describe('<LetterCount />', () => {
  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LetterCount count="5" />, div);
  });

  test('Props render correctly', () => {
    const testRender = renderer.create(<LetterCount count="5" />).toJSON();
    expect(testRender).toMatchSnapshot();
  });
});
