// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import store from '../../store/redux';
import CategoriesLayout from './CategoriesLayout';

test('<CategoriesLayout />: Renders without crashing', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <CategoriesLayout />
    </Provider>
  );
  expect(wrapper).toHaveLength(1);
});
