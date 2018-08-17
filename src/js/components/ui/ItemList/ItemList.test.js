import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import classDefault from '../../../types/class';
import ItemList from './ItemList';

configure({ adapter: new Adapter() });

describe('<ItemList />', () => {
    const defaultProps = {
        form: {},
        insert: ()=>{},
        items: [],
        move: ()=>{},
        name: '',
        pop: ()=>{},
        push: jest.fn(),
        remove: jest.fn(),
        selected: [],
        swap: ()=>{},
        totalCount: 0,
        unshift: ()=>{},
    };

    test('Renders without crashing', () => {
      const wrapper = shallow(<ItemList {...defaultProps} />);
      expect(wrapper).toHaveLength(1);
    });

    test('Renders items correctly', () => {
        let wrapper = shallow(<ItemList {...defaultProps} />);
        expect(wrapper.find('.ItemList__item')).toHaveLength(0);

        let props = {
            items:[
                {...classDefault, id: '1' },
                {...classDefault, id: '2' },
                {...classDefault, id: '3' },
            ],
            totalCount: 5, 
        };
        
        wrapper = shallow(<ItemList {...props} />);
        expect(wrapper.find('.ItemList__item')).toHaveLength(props.items.length);
        
        props.totalCount = 0;
        wrapper = shallow(<ItemList {...props} />);
        expect(wrapper.find('.ItemList__item')).toHaveLength(0);
    });

    test('Checkbox onChange calls push', () => {
        const props = {
            ...defaultProps,
            items:[ {...classDefault, id: '1' } ],
            push: jest.fn(),
            remove: jest.fn(),
            totalCount: 1,
        };
        const wrapper = shallow(<ItemList {...props} />);
        const input = wrapper.find('input');
        expect(input).toHaveLength(1);

        input.simulate('change', { target: { checked: true } });
        expect(props.push).toHaveBeenCalled();
        expect(props.remove).not.toHaveBeenCalled();
    });

    test('Checkbox onChange calls remove', () => {
        const props = {
            ...defaultProps,
            items:[ {...classDefault, id: '1' } ],
            push: jest.fn(),
            remove: jest.fn(),
            selected:[ '1' ],
            totalCount: 1,
        };
        const wrapper = shallow(<ItemList {...props} />);
        const input = wrapper.find('input');
        expect(input).toHaveLength(1);

        input.simulate('change', { target: { checked: false } });
        expect(props.remove).toHaveBeenCalled();
        expect(props.push).not.toHaveBeenCalled();
    });
});
