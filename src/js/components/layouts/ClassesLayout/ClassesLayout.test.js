// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../../store';
import ClassesLayout from './ClassesLayout';

configure({ adapter: new Adapter() });

test('<ClassesLayout />: Renders without crashing', () => {
  const wrapper = shallow(<Provider store={store}><ClassesLayout /></Provider>);
  expect(wrapper).toHaveLength(1);
});
