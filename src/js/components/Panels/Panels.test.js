// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import store from '../../store/redux';
import Panels from './Panels';
import { ROUTE_HOME } from '../../constants/routes';

describe('<Panels />', () => {
  let props = {};

  beforeEach(() => {
    props = {
      dispatch: jest.fn(),
      classes: [],
      pupils: {},
    };
  });

  test('Renders without crashing', () => {
    const wrapper = shallow(<Provider store={store}><Panels {...props} /></Provider>);
    expect(wrapper).toHaveLength(1);
  });

  test('history.push() called on mount if match path is /', () => {
    const routerProps = {
      history: {
        push: jest.fn(),
      },
      match: {
        path: ROUTE_HOME,
      },
    };
    const wrapper = shallow(<Panels.WrappedComponent {...props} {...routerProps} />);
    expect(routerProps.history.push).toHaveBeenCalledWith(ROUTE_HOME);
  });
});
