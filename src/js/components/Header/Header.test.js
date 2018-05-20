// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import '../Translation/testData';

configure({ adapter: new Adapter() });

test('<Header />: Renders without crashing', () => {
  const props = {
    history: {},
    location: {},
    match: {},
  }
  const wrapper = shallow(<MemoryRouter><Header {...props} /></MemoryRouter>);
  expect(wrapper).toHaveLength(1);
});
