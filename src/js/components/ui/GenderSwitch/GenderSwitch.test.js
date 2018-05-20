import React from 'react';
import ReactDOM from 'react-dom';
import GenderSwitch from './GenderSwitch';

describe('<GenderSwitch />:', () => {
  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GenderSwitch />, div);
  });
});
