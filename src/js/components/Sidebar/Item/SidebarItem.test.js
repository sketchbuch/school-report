// @flow

import React from 'react';
import { mount, shallow } from 'enzyme';
import SidebarItem from './SidebarItem';
import ClassDefault, { ClassFactory } from '../../../types/class';

jest.mock('../Inner/SidebarInner', () => (props: Object) => {
  if (props.link) {
    return <a href="#" className="SidebarInner" />;
  } else {
    return <div className="SidebarInner" />;
  }
});
jest.useFakeTimers();

describe('<SidebarItem />', () => {
  const props = {
    isNew: false,
    item: ClassFactory({ ...ClassDefault }, Date.now()),
    itemDuration: 1000,
    itemType: 'class',
    onDelete: () => {},
    updateExistingItems: () => {},
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<SidebarItem {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('className correctly set', () => {
    let wrapper = shallow(<SidebarItem {...props} />);
    expect(wrapper.find('.SidebarItem')).toHaveLength(1);
    expect(wrapper.find('.SidebarItem--new')).toHaveLength(0);
    expect(wrapper.find('.SidebarItem--delete')).toHaveLength(0);
    expect(wrapper.find('.SidebarItem--deleting')).toHaveLength(0);

    wrapper = shallow(<SidebarItem {...props} isNew={true} />);
    expect(wrapper.find('.SidebarItem--new')).toHaveLength(1);

    wrapper.setState({ delete: true });
    expect(wrapper.find('.SidebarItem--delete')).toHaveLength(1);

    wrapper.setState({ deleting: true });
    expect(wrapper.find('.SidebarItem--deleting')).toHaveLength(1);
  });

  test('Renders SidebarInner as a link if !this.state.delete', () => {
    const wrapper = mount(<SidebarItem {...props} />);
    expect(wrapper.find('a.SidebarInner')).toHaveLength(1);
    expect(wrapper.find('div.SidebarInner')).toHaveLength(0);

    wrapper.setState({ delete: true });
    expect(wrapper.find('a.SidebarInner')).toHaveLength(0);
    expect(wrapper.find('div.SidebarInner')).toHaveLength(1);
  });

  describe('handleClick()', () => {
    const wrapper = mount(<SidebarItem {...props} />);
    const initialState = { ...wrapper.state() };

    test('Leaves state as is if no case matches', () => {
      wrapper.instance().handleClick({
        preventDefault: jest.fn(),
        target: { dataset: { action: '' } },
      });

      expect(wrapper.state()).toEqual(initialState);
    });

    test('"item-delete-yes" sets deleting to true', () => {
      expect(wrapper.state().deleting).toBe(false);

      wrapper.instance().handleClick({
        preventDefault: jest.fn(),
        target: { dataset: { action: 'item-delete-yes' } },
      });

      expect(wrapper.state().deleting).toBe(true);
    });

    test('"item-delete" sets delete to true, and back to false after timeoutDuration', () => {
      expect(wrapper.state().delete).toBe(false);

      wrapper.instance().handleClick({
        preventDefault: jest.fn(),
        target: { dataset: { action: 'item-delete' } },
      });

      expect(wrapper.state().delete).toBe(true);
      jest.runAllTimers();
      expect(wrapper.state().delete).toBe(false);
    });

    test('"item-delete-no" sets delete to false', () => {
      const wrapper2 = mount(<SidebarItem {...props} />);
      expect(wrapper2.state().delete).toBe(false);

      wrapper2.setState({ delete: true });
      expect(wrapper2.state().delete).toBe(true);

      wrapper2.instance().handleClick({
        preventDefault: jest.fn(),
        target: { dataset: { action: 'item-delete-no' } },
      });
      expect(wrapper2.state().delete).toBe(false);
    });
  });

  describe('componentDidMount()', () => {
    test('updateExistingItems() not called if the item !isNew', () => {
      const mockUpdateExistingItems = jest.fn();
      const wrapper = shallow(
        <SidebarItem
          {...props}
          updateExistingItems={mockUpdateExistingItems}
          isNew={false}
        />
      );
      jest.runAllTimers();
      expect(mockUpdateExistingItems).not.toHaveBeenCalled();
    });

    test('updateExistingItems() called if the item isNew', () => {
      const mockUpdateExistingItems = jest.fn();
      const wrapper = shallow(
        <SidebarItem
          {...props}
          updateExistingItems={mockUpdateExistingItems}
          isNew={true}
        />
      );
      jest.runAllTimers();
      expect(mockUpdateExistingItems).toHaveBeenCalled();
    });
  });

  describe('componentDidUpdate()', () => {
    const mockOnDelete = jest.fn();
    const wrapper = mount(<SidebarItem {...props} onDelete={mockOnDelete} />);

    test('if state.deleting, sets state.confirmed to true', () => {
      wrapper.instance().handleClick({
        preventDefault: jest.fn(),
        target: { dataset: { action: 'item-delete-yes' } },
      });

      expect(wrapper.state().deleting).toBe(true);
      expect(wrapper.state().confirmed).toBe(false);
      jest.runAllTimers();
      expect(wrapper.state().confirmed).toBe(true);
    });
    test('if state.confirmed is true, should call onDelete()', () => {
      expect(wrapper.state().confirmed).toBe(true);
      expect(mockOnDelete).toHaveBeenCalledWith(props.item.id);
    });
  });
});
