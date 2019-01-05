// @flow

import React from 'react';
import { shallow } from 'enzyme';
import DeletePupilsLayout from './DeletePupilsLayout';
import classDefault from '../../../types/class';

describe.skip('<DeletePupilsLayout />', () => {
  const props = {
    activeClass: {...classDefault, id: 'c1', label: 'Test Class' },
    dispatch: jest.fn(),
    history: {},
    location: {},
    match: {},
    pupils: [],
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<DeletePupilsLayout {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Handles deleting correctly', () => {
    let wrapper = shallow(<DeletePupilsLayout {...props} />);
    wrapper.instance().saveData = jest.fn();
    expect(wrapper.find('.DeleteClassesLayout__submsg')).toHaveLength(1);
    wrapper.setState({ deleting: true, });
    expect(wrapper.find('.DeleteClassesLayout__submsg')).toHaveLength(0);
  });
});
