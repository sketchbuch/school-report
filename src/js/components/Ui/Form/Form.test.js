// @flow

import React from 'react';
import { shallow } from 'enzyme';
import Form from './Form';
import type { Props } from './Form';

describe('<Form />', () => {
  const props: Props = {
    children: null,
    onSubmit: jest.fn(),
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<Form {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
