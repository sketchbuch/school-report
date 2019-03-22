// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import HeaderPath from './HeaderPath';
import type { Props } from './HeaderPath';
import store from '../../../store/redux';

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
  const props: Props = {
    breadcrumbs: [],
    location: {},
    match: {},
    path: '',
  };

  test('<Renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <HeaderPath {...props} />
      </Provider>
    );
    expect(wrapper).toHaveLength(1);
  });

  test('Breadcrumbs render', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <HeaderPath {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('HeaderBreadcrumb')).toHaveLength(1);
  });

  test('<Returns null if no breadcrumbs', () => {
    const wrapper = shallow(<HeaderPath.WrappedComponent {...props} store={store} />);
    expect(wrapper.get(0)).toBeNull();
  });
});
