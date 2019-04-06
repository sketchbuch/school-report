//@flow

import React from 'react';
import { shallow } from 'enzyme';
import ItemList from './ItemList';
import classDefault, { ClassFactory } from '../../../types/class';
import type { DomainType } from '../../../types/domain';
import type { Props } from './ItemList';

describe('<ItemList />', () => {
  const props: Props = {
    anywhere: false,
    form: {},
    insert: () => {},
    items: [],
    move: () => {},
    name: '',
    pop: () => {},
    push: jest.fn(),
    remove: jest.fn(),
    selected: [],
    swap: () => {},
    totalCount: 0,
    unshift: () => {},
  };

  const items: DomainType[] = [
    ClassFactory({ ...classDefault, label: 'Class 1' }, Date.now()),
    ClassFactory({ ...classDefault, label: 'Class 2' }, Date.now()),
    ClassFactory({ ...classDefault, label: 'Class 3' }, Date.now()),
  ];

  test('Renders without crashing', () => {
    const wrapper = shallow(<ItemList {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Renders items correctly', () => {
    let wrapper = shallow(<ItemList {...props} />);
    expect(wrapper.find('.ItemList__item')).toHaveLength(0);

    wrapper = shallow(<ItemList {...props} items={items} totalCount={5} />);
    expect(wrapper.find('.ItemList__item')).toHaveLength(items.length);
  });

  test('Checkbox onChange calls push', () => {
    const mockPush = jest.fn();
    const mockRemove = jest.fn();
    const pushProps = {
      ...props,
      items: items.slice(0, 1),
      push: jest.fn(),
      remove: jest.fn(),
      totalCount: 1,
    };
    const wrapper = shallow(<ItemList {...pushProps} push={mockPush} remove={mockRemove} />);
    const input = wrapper.find('input');
    expect(input).toHaveLength(1);

    input.simulate('change', { target: { checked: true } });
    expect(mockPush).toHaveBeenCalled();
    expect(mockRemove).not.toHaveBeenCalled();
  });

  test('Checkbox onChange calls remove', () => {
    const mockPush = jest.fn();
    const mockRemove = jest.fn();
    const removeProps = {
      ...props,
      items: items.slice(0, 1),
      push: jest.fn(),
      remove: jest.fn(),
      selected: ['1'],
      totalCount: 1,
    };
    const wrapper = shallow(<ItemList {...removeProps} push={mockPush} remove={mockRemove} />);
    const input = wrapper.find('input');
    expect(input).toHaveLength(1);

    input.simulate('change', { target: { checked: false } });
    expect(mockRemove).toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
