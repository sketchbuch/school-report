// @flow

import React from 'react';
import { shallow } from 'enzyme';
import { ItemSelection } from './ItemSelection';
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
});
