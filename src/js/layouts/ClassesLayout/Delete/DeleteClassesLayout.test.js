// @flow

import React from 'react';
import { shallow } from 'enzyme';
import DeleteClassesLayout from './DeleteClassesLayout';
import type { Props } from './DeleteClassesLayout';

describe('<DeleteClassesLayout />', () => {
  const props: Props = {
    dispatch: jest.fn(),
    history: {},
    location: {},
    match: {},
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<DeleteClassesLayout {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test.skip('Handles deleting correctly', () => {
    let wrapper = shallow(<DeleteClassesLayout {...props} />);
    wrapper.instance().saveData = jest.fn();
    expect(wrapper.dive().find('.form__submsg')).toHaveLength(1);
    wrapper.setState({ deleting: true });
    expect(wrapper.dive().find('.form__submsg')).toHaveLength(0);
  });
});
