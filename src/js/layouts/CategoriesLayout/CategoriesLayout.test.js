// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../../store/redux';
import CategoriesLayout from './CategoriesLayout';

configure({ adapter: new Adapter() });

test('<CategoriesLayout />: Renders without crashing', () => {
  const wrapper = shallow(<Provider store={store}><CategoriesLayout /></Provider>);
  expect(wrapper).toHaveLength(1);
});
