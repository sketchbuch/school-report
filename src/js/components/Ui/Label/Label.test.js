// @flow

import React from 'react';
import { shallow } from 'enzyme';
import Label from './Label';
import type { Props } from './Label';

describe('<Label />', () => {
  const props: Props = {
    children: null,
    classes: '',
    htmlFor: '',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<Label {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
