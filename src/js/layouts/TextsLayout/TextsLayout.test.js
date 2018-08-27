// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../store/redux';
import TextsLayout from './TextsLayout';

configure({ adapter: new Adapter() });

test('<TextsLayout />: Renders without crashing', () => {
  const wrapper = shallow(<Provider store={store}><TextsLayout /></Provider>);
  expect(wrapper).toHaveLength(1);
});
