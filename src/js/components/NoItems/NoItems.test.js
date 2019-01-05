// @flow

import React from 'react';
import { shallow } from 'enzyme';
import NoItems from './NoItems';

describe('<NoItems />', () => {
  const props = {
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
});
