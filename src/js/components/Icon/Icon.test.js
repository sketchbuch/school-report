// @flow

import React from 'react';
import { shallow } from 'enzyme';
import Icon from './Icon';
import type { Props } from './Icon';

test('<Icon />: Renders without crashing', () => {
  const props: Props = {
    type: 'hat',
  };
  const wrapper = shallow(<Icon {...props} />);
  expect(wrapper).toHaveLength(1);
});
