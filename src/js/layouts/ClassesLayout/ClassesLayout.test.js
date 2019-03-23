// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import store from '../../store/redux';
import ClassesLayout from './ClassesLayout';
import type { Props } from './ClassesLayout';

describe('<ClassesLayout />:', () => {
  const props: Props = {
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
