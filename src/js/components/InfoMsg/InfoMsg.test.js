// @flow

import React from 'react';
import { shallow } from 'enzyme';
import InfoMsg from './InfoMsg';

describe('<InfoMsg />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<InfoMsg headline="School" subtext="Report" />);
    expect(wrapper).toHaveLength(1);
  });
});
