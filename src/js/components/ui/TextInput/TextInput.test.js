import React from 'react';
import ReactDOM from 'react-dom';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextInput from './TextInput';

configure({ adapter: new Adapter() });

describe('<TextInput />:', () => {
  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TextInput />, div);
  });

  test('Handles disabled property', () => {
    const props = {
      onChange: jest.fn(),
      disabled: true,
    };
    const wrapper = mount(<TextInput {...props} />);
    wrapper.simulate('change')
    expect(props.onChange.mock.calls.length).toBe(0);
  });
});
