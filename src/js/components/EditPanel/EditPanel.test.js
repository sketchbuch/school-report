// @flow

import React from 'react';
import { shallow } from 'enzyme';
import EditPanel from './EditPanel';
import type { Props } from './EditPanel';

describe('<EditPanel />', () => {
  const props: Props = {
    children: null,
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<EditPanel {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
