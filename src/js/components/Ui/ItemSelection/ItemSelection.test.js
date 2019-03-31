// @flow

import React from 'react';
import { shallow } from 'enzyme';
import ItemSelection from './ItemSelection';
import classDefault, { ClassFactory } from '../../../types/class';
import mockSearch from '../../../tests/mockSearch';
import type { DomainType } from '../../../types/domain';
import type { Props } from './ItemSelection';

describe('<ItemSelection />', () => {
  const props: Props = {
    ...mockSearch,
    items: [],
    name: 'test',
    searchMin: 2,
    selected: [],
  };

  const items: DomainType[] = [
    ClassFactory({ ...classDefault, label: 'USS Enterprise' }, Date.now()),
    ClassFactory({ ...classDefault, label: 'Red Dwarf' }, Date.now()),
    ClassFactory({ ...classDefault, label: 'Red Dwarf 2' }, Date.now()),
  ];

  test('Renders without crashing', () => {
    const wrapper = shallow(<ItemSelection {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  describe('Renders the search field if required:', () => {
    test('Should not render a search field if no items', () => {
      const wrapper = shallow(<ItemSelection {...props} />);
      expect(wrapper.find('.ItemSelection__search')).toHaveLength(0);
    });

    test('Should not render a search field if too few items', () => {
      const wrapper = shallow(<ItemSelection {...props} items={items.slice(0, 2)} />);
      expect(wrapper.find('.ItemSelection__search')).toHaveLength(0);
    });

    test('Should render a search field if enough items', () => {
      const wrapper = shallow(<ItemSelection {...props} items={items} />);
      expect(wrapper.find('.ItemSelection__search')).toHaveLength(1);
    });
  });

  test('Renders the ItemList', () => {
    const wrapper = shallow(<ItemSelection {...props} items={items} />);
    expect(wrapper.find('FieldArray')).toHaveLength(1);
  });

  test('handleSearch() works and shows a filtered number of list items that match the term', () => {
    const wrapper = shallow(<ItemSelection {...props} items={items} />);
    const input = wrapper.find('TextInput');
    const fieldArray = wrapper.find('FieldArray');
    const itemList = fieldArray.dive().find('ItemList');
    const itemElements = itemList.dive().find('label');

    expect(wrapper.state().term).toBe('');
    expect(input).toHaveLength(1);
    expect(fieldArray).toHaveLength(1);
    expect(itemList).toHaveLength(1);
    expect(itemElements).toHaveLength(3);

    input.simulate('change', { preventDefault() {}, currentTarget: { value: 'Red' } });

    const fieldArraySearched = wrapper.find('FieldArray');
    const itemListSearched = fieldArraySearched.dive().find('ItemList');
    const itemElementsSearched = itemListSearched.dive().find('label');

    expect(wrapper.state().term).toBe('Red');
    expect(fieldArraySearched).toHaveLength(1);
    expect(itemListSearched).toHaveLength(1);
    expect(itemElementsSearched).toHaveLength(2);
  });

  test('handleClear() resets the term and shows all items', () => {
    const wrapper = shallow(<ItemSelection {...props} items={items} />);
    const input = wrapper.find('TextInput');
    const fieldArray = wrapper.find('FieldArray');
    const itemList = fieldArray.dive().find('ItemList');
    const itemElements = itemList.dive().find('label');

    expect(input).toHaveLength(1);
    expect(fieldArray).toHaveLength(1);
    expect(itemList).toHaveLength(1);
    expect(itemElements).toHaveLength(3);

    input.simulate('change', { preventDefault() {}, currentTarget: { value: 'Red' } });

    const fieldArraySearched = wrapper.find('FieldArray');
    const itemListSearched = fieldArraySearched.dive().find('ItemList');
    const itemElementsSearched = itemListSearched.dive().find('label');

    expect(wrapper.state().term).toBe('Red');
    expect(fieldArraySearched).toHaveLength(1);
    expect(itemListSearched).toHaveLength(1);
    expect(itemElementsSearched).toHaveLength(2);

    const clearer = wrapper.find('.ItemSelection__searchclear');
    clearer.first().simulate('click', {});

    const fieldArrayCleared = wrapper.find('FieldArray');
    const itemListCleared = fieldArrayCleared.dive().find('ItemList');
    const itemElementsCleared = itemListCleared.dive().find('label');

    expect(wrapper.state().term).toBe('');
    expect(clearer).toHaveLength(1);
    expect(fieldArrayCleared).toHaveLength(1);
    expect(itemListCleared).toHaveLength(1);
    expect(itemElementsCleared).toHaveLength(3);
  });
});
