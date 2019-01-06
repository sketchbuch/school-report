// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import store from '../../store/redux';
import ReportsLayout from './ReportsLayout';

test('<ReportsLayout />: Renders without crashing', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <ReportsLayout />
    </Provider>
  );
  expect(wrapper).toHaveLength(1);
});
