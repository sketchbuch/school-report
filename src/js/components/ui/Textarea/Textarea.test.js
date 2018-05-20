import React from 'react';
import ReactDOM from 'react-dom';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Textarea from './Textarea';

configure({ adapter: new Adapter() });

describe('<Textarea />:', () => {
  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Textarea />, div);
  });

  test('Handles disabled property', () => {
    const props = {
      onChange: jest.fn(),
      disabled: true,
    };
    const wrapper = mount(<Textarea {...props} />);
    wrapper.simulate('change')
    expect(props.onChange.mock.calls.length).toBe(0);
  });
});
