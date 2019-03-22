// @flow

import React from 'react';
import { shallow } from 'enzyme';
import InfoMsg from './InfoMsg';
import type { Props } from './InfoMsg';

describe('<InfoMsg />', () => {
  const props: Props = {
    children: null,
    headine: 'School',
    icon: 'brand',
    subtext: 'Report',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<InfoMsg {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
