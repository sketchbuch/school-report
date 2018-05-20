// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReportsTexts from './ReportsTexts';
import '../../Translation/testData';

configure({ adapter: new Adapter() });

describe('<ReportsTexts />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<ReportsTexts />);
    expect(wrapper).toHaveLength(1);
  });
});
