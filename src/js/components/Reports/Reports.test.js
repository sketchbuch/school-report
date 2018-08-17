// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../store';
import Reports from './Reports';
import store from '../../store';

configure({ adapter: new Adapter() });

describe('<Reports />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<Provider store={store}><Reports /></Provider>);
    expect(wrapper).toHaveLength(1);
  });
});
