// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '../../../Translation/testData';
import DeleteClassesLayout from './DeleteClassesLayout';

configure({ adapter: new Adapter() });

describe('<DeleteClassesLayout />', () => {
  const props = {
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
    wrapper.setState({ deleting: true, });
    expect(wrapper.dive().find('.form__submsg')).toHaveLength(0);
  });
});
