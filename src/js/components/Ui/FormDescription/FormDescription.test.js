// @flow

import React from 'react';
import { shallow } from 'enzyme';
import FormDescription from './FormDescription';
import type { Props } from './FormDescription';

describe('<FormDescription />', () => {
  const props: Props = {
    text: 'Test',
  };
  test('Renders without crashing', () => {
    const wrapper = shallow(<FormDescription {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
