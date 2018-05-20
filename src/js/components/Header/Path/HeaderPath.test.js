// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import store from '../../../store';
import HeaderPath from './HeaderPath';
import '../../Translation/testData';

configure({ adapter: new Adapter() });

test('<HeaderPath />: Renders without crashing', () => {
  const wrapper = shallow(<Provider store={store}><HeaderPath /></Provider>);
  expect(wrapper).toHaveLength(1);
});
