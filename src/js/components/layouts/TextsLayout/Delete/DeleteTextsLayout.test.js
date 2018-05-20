// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DeleteTextsLayout from './DeleteTextsLayout';

configure({ adapter: new Adapter() });

describe.skip('<DeleteTextsLayout />:', () => {
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
    wrapper.setState({ deleting: true, });
    expect(wrapper.find('.DeleteClassesLayout__submsg')).toHaveLength(0);
  });
});
