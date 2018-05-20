// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import SidebarItemButton from './SidebarItemButton';

describe('<SidebarItemButton />', () => {
  const props = {
    history: Object,
    link: "/",
    type: "ui-edit",
  };

  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><SidebarItemButton {...props} /></MemoryRouter>, div);
  });
});
