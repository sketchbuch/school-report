import React from 'react';
import ReactDOM from 'react-dom';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddButton from './AddButton';

configure({ adapter: new Adapter() });

describe('<AddButton />:', () => {
  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AddButton />, div);
  });

  test('Handles disabled property', () => {
    const props = {
      onClick: jest.fn(),
      disabled: true,
    };
    const wrapper = mount(<AddButton {...props} />);
    wrapper.simulate('click')
    expect(props.onClick.mock.calls.length).toBe(0);
  });
});
