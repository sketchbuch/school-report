// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import ReportsLayout from './ReportsLayout';
import mockSearch from '../../tests/mockSearch';
import store from '../../store/redux';
import type { Props } from './ReportsLayout';

describe('<ReportsLayout />:', () => {
  const props: Props = {
    ...mockSearch,
    classes: [],
    reports: [],
  };
  test('Renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ReportsLayout {...props} />
      </Provider>
    );
    expect(wrapper).toHaveLength(1);
  });
});
