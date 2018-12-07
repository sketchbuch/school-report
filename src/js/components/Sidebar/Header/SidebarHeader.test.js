// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import SidebarHeader from './SidebarHeader';

configure({ adapter: new Adapter() });

describe('<SidebarHeader />', () => {
  const props = { title: 'Test title', subtitle: '' };

  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SidebarHeader {...props} />, div);
  });

  test('Props render correctly', () => {
    const testRender = renderer.create(<SidebarHeader {...props} />).toJSON();
    expect(testRender).toMatchSnapshot();
  });

  test('Subtitle not displayed if not supplied', () => {
    const wrapper = shallow(<SidebarHeader {...props} />);
    const headline = wrapper.find('h1');
    expect(headline).toHaveLength(1);
    expect(headline.find('span')).toHaveLength(0);
  });

  test('Subtitle not displayed if not supplied', () => {
    const wrapper = shallow(<SidebarHeader {...props} subtitle="Test" />);
    const headline = wrapper.find('h1');
    expect(headline).toHaveLength(1);
    expect(headline.find('span')).toHaveLength(1);
  });
});
