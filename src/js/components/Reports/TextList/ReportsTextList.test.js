// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReportsTextList from './ReportsTextList';

configure({ adapter: new Adapter() });

describe('<ReportsTextList />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<ReportsTextList />);
    expect(wrapper).toHaveLength(1);
  });
});
