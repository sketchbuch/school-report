import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import NavButtonCircular from './NavButtonCircular';

describe('<NavButtonCircular />:', () => {
  const props = {
    to: '/classes',
  };
  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><NavButtonCircular {...props} /></MemoryRouter>, div);
  });
});
