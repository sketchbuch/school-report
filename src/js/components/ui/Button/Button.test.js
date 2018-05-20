import React from 'react';
import ReactDOM from 'react-dom';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from './Button';

configure({ adapter: new Adapter() });

describe('<Button />:', () => {
  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button />, div);
  });

  test('Handles disabled property', () => {
    const props = {
      onClick: jest.fn(),
      disabled: true,
    };
    const wrapper = mount(<Button {...props} />);
    wrapper.simulate('click')
    expect(props.onClick.mock.calls.length).toBe(0);
  });

  test('Handles busy property', () => {
    const props = {
      busy: true,
    };
    const wrapper = mount(<Button {...props} />);
    expect(wrapper.find('.icofont-refresh')).toHaveLength(1);
  });
});
