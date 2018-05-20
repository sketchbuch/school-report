import React from 'react';
import ReactDOM from 'react-dom';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ButtonCircular from './ButtonCircular';

configure({ adapter: new Adapter() });

describe('<ButtonCircular />:', () => {
  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ButtonCircular />, div);
  });

  test('Handles disabled property', () => {
    const props = {
      onClick: jest.fn(),
      disabled: true,
    };
    const wrapper = mount(<ButtonCircular {...props} />);
    wrapper.simulate('click')
    expect(props.onClick.mock.calls.length).toBe(0);
  });

  test('Handles visual property', () => {
    const props = {
      visual: true,
    };
    const wrapper = mount(<ButtonCircular {...props} />);
    expect(wrapper.find('button')).toHaveLength(0);
  });
});
