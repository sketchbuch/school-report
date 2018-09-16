// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InfoMsg from './InfoMsg';

configure({ adapter: new Adapter() });

describe('<InfoMsg />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<InfoMsg headline="School" subtext="Report" />);
    expect(wrapper).toHaveLength(1);
  });
});
