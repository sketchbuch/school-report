// @flow

import React from 'react';
import { shallow } from 'enzyme';
import Field from './Field';
import type { Props } from './Field';

describe('<Field />', () => {
  const props: Props = {
    children: null,
    classes: '',
  };
  test('Renders without crashing', () => {
    const wrapper = shallow(<Field {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
