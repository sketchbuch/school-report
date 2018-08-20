// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../store/redux';
import Reports from './Reports';

configure({ adapter: new Adapter() });

describe('<Reports />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<Provider store={store}><Reports /></Provider>);
    expect(wrapper).toHaveLength(1);
  });
});
