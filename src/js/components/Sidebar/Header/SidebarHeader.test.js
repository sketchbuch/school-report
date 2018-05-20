// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import SidebarHeader from './SidebarHeader';

describe('<SidebarHeader />', () => {
  const props = { title: 'Test title' };

  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SidebarHeader {...props} />, div);
  });

  test('Props render correctly', () => {
    const testRender = renderer.create(<SidebarHeader {...props} />).toJSON();
    expect(testRender).toMatchSnapshot();
  });
});
