// @flow

import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import EditPanelHeader from './EditPanelHeader';

describe('<EditPanelHeader />', () => {
  const props = { title: 'Test title' };

  test('Renders without crashing', () => {
    const wrapper = shallow(<EditPanelHeader {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Props render correctly', () => {
    const testRender = renderer.create(<EditPanelHeader {...props} />).toJSON();
    expect(testRender).toMatchSnapshot();
  });
});
