// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NoItems from './NoItems';

configure({ adapter: new Adapter() });

describe('<NoItems />', () => {
  const props = {
    message: 'No items',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<NoItems {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
