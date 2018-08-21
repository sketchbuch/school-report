// @flow
import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../../../store/redux';
import { getBreadcrumbs } from '../../../utils/redux';
import HeaderPath from './HeaderPath';
import '../../Translation/testData';

configure({ adapter: new Adapter() });

jest.mock('../../../utils/redux', () => {
  return {
    getBreadcrumbs: jest.fn(()=>{
      return [{
        id: 'b1222',
        link: '/',
        text: 'Link',
      }];
    })
  }
});

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

  test('Breadcrumbs render', () => {
    const wrapper = mount(<Provider store={store}><MemoryRouter><HeaderPath/></MemoryRouter></Provider>);
    expect(wrapper.find('HeaderBreadcrumb')).toHaveLength(1);
  });

  test('<Returns null if no breadcrumbs', () => {
    const wrapper = shallow(<HeaderPath.WrappedComponent store={store} breadcrumbs={[]} />);
    expect(wrapper.get(0)).toBeNull();
  });
}); 