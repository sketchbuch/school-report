// @flow

import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from './Sidebar';

describe('<Sidebar />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper).toHaveLength(1);
  });

  test('Handles header and footer props correctly', () => {
    const props = { header: false, footer: false };
    let wrapper = shallow(<Sidebar {...props} />);

    expect(wrapper.find('.Sidebar').hasClass('Sidebar--header')).toEqual(false);
    expect(wrapper.find('.Sidebar').hasClass('Sidebar--footer')).toEqual(false);

    wrapper = shallow(<Sidebar {...props} header={true} />);
    expect(wrapper.find('.Sidebar').hasClass('Sidebar--header')).toEqual(true);
    expect(wrapper.find('.Sidebar').hasClass('Sidebar--footer')).toEqual(false);

    wrapper = shallow(<Sidebar {...props} footer={true} />);
    expect(wrapper.find('.Sidebar').hasClass('Sidebar--header')).toEqual(false);
    expect(wrapper.find('.Sidebar').hasClass('Sidebar--footer')).toEqual(true);
  });
});
