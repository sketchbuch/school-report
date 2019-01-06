// @flow

import React from 'react';
import { shallow } from 'enzyme';
import Icon from './Icon';

test('<Icon />: Renders without crashing', () => {
  const props = {
    type: 'hat',
  };
  const wrapper = shallow(<Icon {...props} />);
  expect(wrapper).toHaveLength(1);
});
