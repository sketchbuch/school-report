// @flow

import React from 'react';
import { shallow } from 'enzyme';
import DeleteTextsLayout from './DeleteTextsLayout';

describe.skip('<DeleteTextsLayout />', () => {
  const props = {
    dispatch: jest.fn(),
    history: {},
    location: {},
    match: {},
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<DeleteTextsLayout {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Handles deleting correctly', () => {
    let wrapper = shallow(<DeleteTextsLayout {...props} />);
    wrapper.instance().saveData = jest.fn();
    expect(wrapper.find('.DeleteClassesLayout__submsg')).toHaveLength(1);
    wrapper.setState({ deleting: true });
    expect(wrapper.find('.DeleteClassesLayout__submsg')).toHaveLength(0);
  });
});
