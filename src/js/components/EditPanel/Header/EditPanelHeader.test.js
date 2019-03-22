// @flow

import React from 'react';
import { shallow } from 'enzyme';
import EditPanelHeader from './EditPanelHeader';
import type { Props } from './EditPanelHeader';

describe('<EditPanelHeader />', () => {
  const props: Props = {
    alert: false,
    children: null,
    subtitle: '',
    count: 0,
    title: 'Test title',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<EditPanelHeader {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
