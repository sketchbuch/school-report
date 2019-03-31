// @flow

import React from 'react';
import { shallow } from 'enzyme';
import FormCancel from './FormCancel';
import type { Props } from './FormCancel';

describe('<FormCancel />', () => {
  const props: Props = {
    children: null,
  };
  test('Renders without crashing', () => {
    const wrapper = shallow(<FormCancel {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
