// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../store';
import Panels from './Panels';
import { ROUTE_HOME } from '../../constants/routes';
import '../Translation/testData';

configure({ adapter: new Adapter() });

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
