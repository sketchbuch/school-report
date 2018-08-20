// @flow
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import store from '../../../store/redux';
import HeaderPath from './HeaderPath';
import '../../Translation/testData';

configure({ adapter: new Adapter() });

describe('<HeaderPath />', () => {
  const props = {
    breadcrumbs: [],
    location: {},
    match: {},
    path: '',
  };

  test('<Renders without crashing', () => {
    const wrapper = shallow(<Provider store={store}><HeaderPath breadcrumbs={[]} /></Provider>);
    expect(wrapper).toHaveLength(1);
  });

  test('<Renders without crashing 2', () => {
    const breadcrumbs = [{
      id: 'b1',
      link: '/',
      text: 'Link',
    }];
    const wrapper = shallow(<Provider store={store}><HeaderPath breadcrumbs={breadcrumbs} /></Provider>);
  });
}); 