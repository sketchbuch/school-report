// @flow

import React from 'react';
import { shallow } from 'enzyme';
import NoItems from './NoItems';
import type { Props } from './NoItems';

describe('<NoItems />', () => {
  const props: Props = {
    children: null,
    message: 'No items',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<NoItems {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Renders children if no message', () => {
    const wrapper = shallow(<NoItems>Test</NoItems>);
    expect(wrapper.find('p')).toHaveLength(1);
  });
  // TODO - Add test for null
});
