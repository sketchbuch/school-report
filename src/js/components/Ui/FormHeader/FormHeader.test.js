// @flow

import React from 'react';
import { shallow } from 'enzyme';
import FormHeader from './FormHeader';
import type { Props } from './FormHeader';

describe('<FormHeader />', () => {
  const props: Props = {
    text: 'Test',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<FormHeader {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
