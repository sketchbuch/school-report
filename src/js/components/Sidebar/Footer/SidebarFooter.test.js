// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import SidebarFooter from './SidebarFooter';
import '../../Translation/testData';


describe('<SidebarFooter />', () => {
  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SidebarFooter />, div);
  });
});
