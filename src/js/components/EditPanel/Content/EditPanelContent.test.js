// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EditPanelContent from './EditPanelContent';

configure({ adapter: new Adapter() });

describe('<EditPanelContent />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<EditPanelContent />);
    expect(wrapper).toHaveLength(1);
  });
});
