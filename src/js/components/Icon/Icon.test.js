// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Icon from './Icon';

configure({ adapter: new Adapter() });

test('<Icon />: Renders without crashing', () => {
  const props = {
    type: 'hat',
  }
  const wrapper = shallow(<Icon {...props} />);
  expect(wrapper).toHaveLength(1);
});
