// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import SidebarFooter from './SidebarFooter';

describe('<SidebarFooter />', () => {
  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SidebarFooter />, div);
  });
});
