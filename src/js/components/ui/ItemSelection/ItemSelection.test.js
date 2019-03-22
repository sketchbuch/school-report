// @flow

import React from 'react';
import { mount, shallow } from 'enzyme';
import ItemSelection from './ItemSelection';
import classDefault, { ClassFactory } from '../../../types/class';
import type { DomainType } from '../../../types/domain';
import type { Props } from './ItemSelection';

describe('<ItemSelection />', () => {
  const props: Props = {
    items: [],
    name: 'test',
    searchMin: 3,
    selected: [],
  };

  const items: DomainType[] = [
    ClassFactory({ ...classDefault, label: 'USS Enterprise' }, Date.now()),
    ClassFactory({ ...classDefault, label: 'Red Dwarf' }, Date.now()),
    ClassFactory({ ...classDefault, label: 'White Dwarf' }, Date.now()),
  ];

  test('Renders without crashing', () => {
    const wrapper = shallow(<ItemSelection {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Renders the search field if required', () => {
    let wrapper = shallow(<ItemSelection {...props} />);
    expect(wrapper.find('.ItemSelection__search')).toHaveLength(0);

    wrapper = shallow(<ItemSelection {...props} items={items.slice(0, 2)} />);
    expect(wrapper.find('.ItemSelection__search')).toHaveLength(0);

    wrapper = shallow(<ItemSelection {...props} items={items} />);
    expect(wrapper.find('.ItemSelection__search')).toHaveLength(1);
  });

  test('Renders the ItemList', () => {
    const wrapper = mount(<ItemSelection {...props} items={items} />);
    expect(wrapper.find('.ItemList')).toHaveLength(1);
  });

  test('handleSearch() works and shows a filtered number of list items that match the term', () => {
    const wrapper = mount(<ItemSelection {...props} items={items} />);
    const input = wrapper.find('.TextInput');
    expect(input).toHaveLength(1);
    expect(wrapper.find('.ItemList__item')).toHaveLength(3);

    input.instance().value = 'Dwarf';
    input.first().simulate('change');
    expect(wrapper.find('.ItemList__item')).toHaveLength(2);
    expect(wrapper.state().term).toBe('Dwarf');
  });

  test('handleClear() resets the term and shows all items', () => {
    const wrapper = mount(<ItemSelection {...props} items={items} />);
    const input = wrapper.find('.TextInput');
    expect(input).toHaveLength(1);
    expect(wrapper.find('.ItemList__item')).toHaveLength(3);

    input.instance().value = 'Dwarf';
    input.first().simulate('change');
    expect(wrapper.find('.ItemList__item')).toHaveLength(2);
    expect(wrapper.state().term).toBe('Dwarf');

    const clearer = wrapper.find('.ItemSelection__searchclear');
    clearer.first().simulate('click');
    expect(wrapper.find('.ItemList__item')).toHaveLength(3);
    expect(wrapper.state().term).toBe('');
  });
});
