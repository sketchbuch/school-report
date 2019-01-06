// @flow

import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import textDefault, { TextFactory } from '../../../types/text';
import SidebarList from './SidebarList';
import { DELETE_TEXT } from '../../../constants/actionTypes';

jest.mock('../Inner/SidebarInner', () => () => (
  <div className="SidebarInner" />
));
jest.mock(
  '../../../fs/persist',
  () => (
    dispatch: Function,
    getState: Function,
    callback: Function,
    content: Array<string>
  ) => {
    callback();
  }
);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ texts: [] });

describe('<SidebarList />', () => {
  const props = {
    dispatch: jest.fn(store.dispatch),
    items: [
      TextFactory(
        { ...textDefault, bodytext: 'Red Dwarf', categories: ['c1'] },
        Date.now(),
        'EN'
      ),
      TextFactory(
        { ...textDefault, bodytext: 'Blue Midget', categories: [] },
        Date.now(),
        'EN'
      ),
      TextFactory(
        { ...textDefault, bodytext: 'Starbug', categories: ['c1', 'c2'] },
        Date.now(),
        'EN'
      ),
    ],
    listType: 'text',
    noItemsTxt: 'No items in list',
    sortOrder: ['created'],
  };
  const existingId = props.items[0].id;
  const itemLength = props.items.length;

  test('Renders without crashing', () => {
    const wrapper = shallow(<SidebarList {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('State contains the IDs of the existing items', () => {
    const wrapper = shallow(<SidebarList {...props} />);
    const testExistingItems = [];

    props.items.forEach(item => {
      if (!testExistingItems.includes(item.id)) testExistingItems.push(item.id);
    });

    expect(wrapper.state().existingItems).toEqual(testExistingItems);
  });

  test('onDelete() dispatches correct action', () => {
    const callback = jest.fn();
    const EXPECTED_ACTIONS = [
      { type: DELETE_TEXT, payload: { id: existingId } },
    ];
    const wrapper = shallow(<SidebarList {...props} />);

    expect.assertions(3);
    wrapper.instance().onDelete(existingId, callback);
    expect(props.dispatch).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });

  test('Handles no items correctly', () => {
    const wrapper = shallow(<SidebarList {...props} items={[]} />);
    expect(wrapper.find('NoItems')).toHaveLength(1);
  });

  test('Handles no builder prop correctly', () => {
    let wrapper = shallow(<SidebarList {...props} />);
    expect(wrapper.find('SidebarBuilderItem')).toHaveLength(0);
    expect(wrapper.find('SidebarItem')).toHaveLength(itemLength);

    wrapper = shallow(<SidebarList {...props} builder={true} />);
    expect(wrapper.find('SidebarBuilderItem')).toHaveLength(itemLength);
    expect(wrapper.find('SidebarItem')).toHaveLength(0);
  });

  test('componentDidUpdate() clears existingItems if there are no items', () => {
    const wrapper = mount(<SidebarList {...props} />);
    expect(wrapper.find('.SidebarList')).toHaveLength(1);
    expect(wrapper.find('NoItems')).toHaveLength(0);
    expect(wrapper.state().existingItems).toHaveLength(itemLength);

    wrapper.setProps({ items: [] });
    expect(wrapper.state().existingItems).toHaveLength(0);
    expect(wrapper.find('.SidebarList')).toHaveLength(0);
    expect(wrapper.find('NoItems')).toHaveLength(1);
    expect(wrapper.state().existingItems).toHaveLength(0);
  });

  test('updateExistingItems() Adds the item ID if it is not already in existingItems', () => {
    const newId = '12345';
    const wrapper = shallow(<SidebarList {...props} />);
    expect(wrapper.state().existingItems).toHaveLength(itemLength);
    expect(wrapper.state().existingItems.includes(existingId)).toBe(true);

    wrapper.instance().updateExistingItems(existingId);
    expect(wrapper.state().existingItems).toHaveLength(itemLength);

    expect(wrapper.state().existingItems.includes(newId)).toBe(false);
    wrapper.instance().updateExistingItems(newId);
    expect(wrapper.state().existingItems).toHaveLength(itemLength + 1);
    expect(wrapper.state().existingItems.includes(newId)).toBe(true);
  });
});
