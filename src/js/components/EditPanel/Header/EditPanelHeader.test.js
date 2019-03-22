// @flow

import React from 'react';
import { shallow } from 'enzyme';
import EditPanelHeader from './EditPanelHeader';

describe('<EditPanelHeader />', () => {
  const props = { title: 'Test title' };

  test('Renders without crashing', () => {
    const wrapper = shallow(<EditPanelHeader {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
