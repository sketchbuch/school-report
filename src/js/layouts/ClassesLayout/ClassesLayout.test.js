// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import ClassesLayout from './ClassesLayout';
import mockSearch from '../../tests/mockSearch';
import store from '../../store/redux';
import type { Props } from './ClassesLayout';

describe('<ClassesLayout />:', () => {
  const props: Props = {
    ...mockSearch,
    classes: [],
    pupils: [],
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ClassesLayout {...props} />
      </Provider>
    );
    expect(wrapper).toHaveLength(1);
  });
});
