// @flow

import React from 'react';
import { shallow } from 'enzyme';
import NoData from './NoData';
import store from '../../store/redux';
import type { Props } from './NoData';

describe('<NoData />', () => {
  const props: Props = {
    dispatch: jest.fn(),
    curLang: 'EN',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<NoData {...props} store={store} />);
    expect(wrapper).toHaveLength(1);
  });
});
