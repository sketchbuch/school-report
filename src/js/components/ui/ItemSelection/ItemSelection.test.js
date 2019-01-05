import React from 'react';
import { mount, shallow } from 'enzyme';
import classDefault, { ClassFactory } from '../../../types/class';
import ItemSelection from './ItemSelection';

describe('<ItemSelection />', () => {
    const defaultProps = {
        items:[],
        name: 'test',
        selected: [],
    };

    test('Renders without crashing', () => {
      const wrapper = shallow(<ItemSelection {...defaultProps} />);
      expect(wrapper).toHaveLength(1);
    });

    test('Renders the search field if required', () => {
        let wrapper = shallow(<ItemSelection {...defaultProps} />);
        expect(wrapper.find('.ItemSelection__search')).toHaveLength(0);

        let props = {
            ...defaultProps,
            items:[
                {...classDefault, id: '1' },
                {...classDefault, id: '2' },
            ],
        }
        wrapper = shallow(<ItemSelection {...props} />);
        expect(wrapper.find('.ItemSelection__search')).toHaveLength(0);

        props = {
            ...defaultProps,
            items:[
                {...classDefault, id: '1' },
                {...classDefault, id: '2' },
                {...classDefault, id: '3' },
            ],
        }
        wrapper = shallow(<ItemSelection {...props} />);
        expect(wrapper.find('.ItemSelection__search')).toHaveLength(1);
    });

    test('Renders the ItemList', () => {
        const props = {
            ...defaultProps,
            items:[
                {...classDefault, id: '1' },
                {...classDefault, id: '2' },
                {...classDefault, id: '3' },
            ],
        }
        const wrapper = mount(<ItemSelection {...props} />);
        expect(wrapper.find('.ItemList')).toHaveLength(1);
    });

    test('handleSearch() works and shows a filtered number of list items that match the term', () => {
        const props = {
            ...defaultProps,
            items:[
                ClassFactory({...classDefault, label: 'USS Enterprise' }, Date.now()),
                ClassFactory({...classDefault, label: 'Red Dwarf' }, Date.now()),
                ClassFactory({...classDefault, label: 'White Dwarf' }, Date.now()),
            ],
        }
        const wrapper = mount(<ItemSelection {...props} />);
        const input = wrapper.find('.TextInput');
        expect(input).toHaveLength(1);
        expect(wrapper.find('.ItemList__item')).toHaveLength(3);

        input.instance().value = 'Dwarf';
        input.first().simulate('change');
        expect(wrapper.find('.ItemList__item')).toHaveLength(2);
        expect(wrapper.state().term).toBe('Dwarf');
    });

    test('handleClear() resets the term and shows all items', () => {
        const props = {
            ...defaultProps,
            items:[
                ClassFactory({...classDefault, label: 'USS Enterprise' }, Date.now()),
                ClassFactory({...classDefault, label: 'Red Dwarf' }, Date.now()),
                ClassFactory({...classDefault, label: 'White Dwarf' }, Date.now()),
            ],
        }
        const wrapper = mount(<ItemSelection {...props} />);
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
