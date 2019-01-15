// @flow
import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../../../store/redux';
import HeaderPath from './HeaderPath';

jest.mock('../../../utils/redux', () => {
  return {
    getBreadcrumbs: jest.fn(() => {
      return [
        {
          id: 'b1222',
          link: '/',
          text: 'Link',
        },
      ];
    }),
  };
});

describe('<HeaderPath />', () => {
  const props = {
    breadcrumbs: [],
    location: {},
    match: {},
    path: '',
  };

  test('<Renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <HeaderPath breadcrumbs={[]} />
      </Provider>
    );
    expect(wrapper).toHaveLength(1);
  });

  test('Breadcrumbs render', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <HeaderPath />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('HeaderBreadcrumb')).toHaveLength(1);
  });

  test('<Returns null if no breadcrumbs', () => {
    const wrapper = shallow(<HeaderPath.WrappedComponent store={store} breadcrumbs={[]} />);
    expect(wrapper.get(0)).toBeNull();
  });
});
