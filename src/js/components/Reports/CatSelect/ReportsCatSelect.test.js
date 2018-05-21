// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReportsCatSelect from './ReportsCatSelect';

configure({ adapter: new Adapter() });

describe('<ReportsCatSelect />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<ReportsCatSelect />);
    expect(wrapper).toHaveLength(1);
  });
});
