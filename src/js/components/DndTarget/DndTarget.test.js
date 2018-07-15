// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DndTarget from './DndTarget';

configure({ adapter: new Adapter() });

describe('<DndTarget />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<DndTarget />);
    expect(wrapper).toHaveLength(1);
  });
});
