// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import store from '../../store/redux';
import ClassesLayout from './ClassesLayout';

test('<ClassesLayout />: Renders without crashing', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <ClassesLayout />
    </Provider>
  );
  expect(wrapper).toHaveLength(1);
});
