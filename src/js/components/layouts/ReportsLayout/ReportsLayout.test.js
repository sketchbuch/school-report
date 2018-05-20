// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../../store';
import ReportsLayout from './ReportsLayout';

configure({ adapter: new Adapter() });

test('<ReportsLayout />: Renders without crashing', () => {
  const wrapper = shallow(<Provider store={store}><ReportsLayout /></Provider>);
  expect(wrapper).toHaveLength(1);
});
