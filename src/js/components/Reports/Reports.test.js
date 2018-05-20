// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Reports from './Reports';

configure({ adapter: new Adapter() });

describe('<Reports />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<Reports />);
    expect(wrapper).toHaveLength(1);
  });
});
