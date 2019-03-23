// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import store from '../../store/redux';
import TextsLayout from './TextsLayout';
import type { Props } from './TextsLayout';

describe('<TextsLayout />:', () => {
  const props: Props = {
    categories: [],
    texts: [],
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <TextsLayout {...props} />
      </Provider>
    );
    expect(wrapper).toHaveLength(1);
  });
});
