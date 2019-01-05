// @flow

import React from 'react';
import { shallow } from 'enzyme';
import EditPanelContent from './EditPanelContent';

describe('<EditPanelContent />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<EditPanelContent />);
    expect(wrapper).toHaveLength(1);
  });

  test('Handles noPadding prop correctly', () => {
    const classStr = '.EditPanelContent--noPadding';
    const wrapper1 = shallow(<EditPanelContent noPadding={false} />);
    const wrapper2 = shallow(<EditPanelContent noPadding={true} />);

    expect(wrapper1.find(classStr)).toHaveLength(0);
    expect(wrapper2.find(classStr)).toHaveLength(1);
  });
});
