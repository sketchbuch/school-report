// @flow

import React from 'react';
import { shallow } from 'enzyme';
import EditPanelContent from './EditPanelContent';
import type { Props } from './EditPanelContent';

describe('<EditPanelContent />', () => {
  const props: Props = {
    children: null,
    noPadding: false,
  };
  test('Renders without crashing', () => {
    const wrapper = shallow(<EditPanelContent {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Handles noPadding prop correctly', () => {
    const classStr = '.EditPanelContent--noPadding';
    const wrapper1 = shallow(<EditPanelContent {...props} />);
    const wrapper2 = shallow(<EditPanelContent {...props} noPadding />);

    expect(wrapper1.find(classStr)).toHaveLength(0);
    expect(wrapper2.find(classStr)).toHaveLength(1);
  });
});
