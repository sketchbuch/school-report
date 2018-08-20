// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../../store/redux';
import PupilsLayout from './PupilsLayout';

configure({ adapter: new Adapter() });

test('<PupilsLayout />: Renders without crashing', () => {
  const wrapper = shallow(<Provider store={store}><PupilsLayout /></Provider>);
  expect(wrapper).toHaveLength(1);
});
