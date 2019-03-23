// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import store from '../../store/redux';
import CategoriesLayout from './CategoriesLayout';
import type { Props } from './CategoriesLayout';

describe('<CategoriesLayout />:', () => {
  const props: Props = {
    categories: [],
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <CategoriesLayout {...props} />
      </Provider>
    );
    expect(wrapper).toHaveLength(1);
  });
});
