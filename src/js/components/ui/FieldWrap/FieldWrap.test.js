// @flow

import React from 'react';
import { shallow } from 'enzyme';
import FieldWrap from './FieldWrap';

test('<FieldWrap />: Renders without crashing', () => {
  const wrapper = shallow(<FieldWrap />);
  expect(wrapper).toHaveLength(1);
});
