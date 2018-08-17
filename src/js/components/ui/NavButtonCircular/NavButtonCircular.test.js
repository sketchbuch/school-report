import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import NavButtonCircular from './NavButtonCircular';

configure({ adapter: new Adapter() });

describe('<NavButtonCircular />', () => {
  const props = { to: '/classes' };

  test('Renders without crashing', () => {
    const wrapper = shallow(<MemoryRouter><NavButtonCircular {...props} /></MemoryRouter>);
    expect(wrapper).toHaveLength(1);
  });

  test('Handles className property', () => {
    const cn1Props = { className: '', to: '/classes' };
    const cn1Wrapper = mount(<MemoryRouter><NavButtonCircular {...cn1Props} /></MemoryRouter>);
    const cn2Props = { className: 'TestClass', to: '/classes' };
    const cn2Wrapper = mount(<MemoryRouter><NavButtonCircular {...cn2Props} /></MemoryRouter>);

    expect(cn1Wrapper.find('a').hasClass('TestClass')).toEqual(false);
    expect(cn2Wrapper.find('a').hasClass('TestClass')).toEqual(true);
  });
});
