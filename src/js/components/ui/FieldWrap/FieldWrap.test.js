// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FieldWrap from './FieldWrap';

configure({ adapter: new Adapter() });

test('<FieldWrap />: Renders without crashing', () => {
  const wrapper = shallow(<FieldWrap />);
  expect(wrapper).toHaveLength(1);
});
