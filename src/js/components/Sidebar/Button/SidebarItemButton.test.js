// @flow

import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import SidebarItemButton from './SidebarItemButton';

describe('<SidebarItemButton />', () => {
  const props = {
    history: { push: jest.fn() },
    link: "/",
    type: "ui-edit",
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<MemoryRouter><SidebarItemButton {...props} /></MemoryRouter>);
    expect(wrapper).toHaveLength(1);
  });

  test('history.push is called (when using component handleClick())', () => {
    const wrapper = mount(<SidebarItemButton.WrappedComponent {...props} />);
    const component = wrapper.find('.SidebarItemButton').first();
    component.simulate('click');

    expect(component).toHaveLength(1);
    expect(props.history.push).toHaveBeenCalledWith(props.link);
  });

  test('handleClick prop gets called', () => {
    const handleClickMock = jest.fn();
    const handlePropClickMock = jest.fn();
    SidebarItemButton.WrappedComponent.prototype.handleClick = handleClickMock;

    const wrapper = mount(<SidebarItemButton.WrappedComponent {...props} handleClick={handlePropClickMock} />);
    const component = wrapper.find('.SidebarItemButton').first();
    component.simulate('click');

    expect(component).toHaveLength(1);
    expect(handlePropClickMock).toHaveBeenCalled();
    expect(handleClickMock).not.toHaveBeenCalled();
  });

  test('handleClick gets called', () => {
    const handleClickMock = jest.fn();
    SidebarItemButton.WrappedComponent.prototype.handleClick = handleClickMock;

    const wrapper = mount(<SidebarItemButton.WrappedComponent {...props} />);
    const component = wrapper.find('.SidebarItemButton').first();
    component.simulate('click');

    expect(component).toHaveLength(1);
    expect(handleClickMock).toHaveBeenCalled();
  });
});
