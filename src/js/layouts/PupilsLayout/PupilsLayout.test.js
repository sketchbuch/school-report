// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import PupilsLayout from './PupilsLayout';
import mockSearch from '../../tests/mockSearch';
import store from '../../store/redux';
import type { Props } from './PupilsLayout';

describe('<PupilsLayout />:', () => {
  const props: Props = {
    ...mockSearch,
    activeClass: {},
    pupils: [],
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <PupilsLayout {...props} />
      </Provider>
    );
    expect(wrapper).toHaveLength(1);
  });
});
