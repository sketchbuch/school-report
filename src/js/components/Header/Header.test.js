// @flow

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import Header from './Header';
import store from '../../store/redux';
import type { Props } from './Header';
import { ROUTE_CATEGORIES } from '../../constants/routes';

jest.doMock('./Path/HeaderPath', () => {
  const HeaderPath = props => {
    return <div className="MockHeaderPath">{props.path}</div>;
  };
  return HeaderPath;
});

describe('<Header />', () => {
  const props: Props = {};

  test('Renders without crashing', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <Header {...props} />
      </MemoryRouter>
    );
    expect(wrapper).toHaveLength(1);
  });

  test.skip('Renders without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ROUTE_CATEGORIES]}>
          <Header {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('.Header__sitetitle')).toHaveLength(1);
  });
});
