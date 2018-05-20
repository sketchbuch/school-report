// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DeleteCategoriesLayout from './DeleteCategoriesLayout';

configure({ adapter: new Adapter() });

describe.skip('<DeleteCategoriesLayout />:', () => {
  const props = {
    dispatch: jest.fn(),
    history: {},
    location: {},
    match: {},
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<DeleteCategoriesLayout {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Handles deleting correctly', () => {
    let wrapper = shallow(<DeleteCategoriesLayout {...props} />);
    wrapper.instance().saveData = jest.fn();
    expect(wrapper.find('.DeleteCategoriesLayout__submsg')).toHaveLength(1);
    wrapper.setState({ deleting: true, });
    expect(wrapper.find('.DeleteCategoriesLayout__submsg')).toHaveLength(0);
  });
});
