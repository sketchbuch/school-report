// @flow

import React from 'react';
import { shallow } from 'enzyme';
import Panels from './Panels';
import type { Props } from './Panels';
import { ROUTE_HOME } from '../../constants/routes';

describe('<Panels />', () => {
  let props: Props = {};

  beforeEach(() => {
    props = {
      history: {
        push: jest.fn(),
      },
      match: {
        path: ROUTE_HOME,
      },
    };
  });

  test('Renders without crashing', () => {
    const wrapper = shallow(<Panels {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('history.push() called on mount if match path is /', () => {
    shallow(<Panels.WrappedComponent {...props} />);
    expect(props.history.push).toHaveBeenCalledWith(ROUTE_HOME);
  });
});
