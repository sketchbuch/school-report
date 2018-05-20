// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EditPanel from './EditPanel';

configure({ adapter: new Adapter() });

describe('<EditPanel />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<EditPanel />);
    expect(wrapper).toHaveLength(1);
  });
});
