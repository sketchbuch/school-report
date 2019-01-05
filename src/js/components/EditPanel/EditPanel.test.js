// @flow

import React from 'react';
import { shallow } from 'enzyme';
import EditPanel from './EditPanel';

describe('<EditPanel />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<EditPanel />);
    expect(wrapper).toHaveLength(1);
  });
});
