import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Alert from './Alert';

describe('<Alert />', () => {
  const props = {
    body: 'The body',
    icon: true,
    title: 'The title',
    type: 'success',
  };

  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Alert />, div);
  });

  test('Renders warn icon', () => {
    const wrapper = mount(<Alert {...props} type="warn" />);
    expect(wrapper.find('.icofont-warning-alt')).toHaveLength(1);
  });

  test('Renders error icon', () => {
    const wrapper = mount(<Alert {...props} type="error" />);
    expect(wrapper.find('.icofont-thumbs-down')).toHaveLength(1);
  });

  test('Renders info icon', () => {
    const wrapper = mount(<Alert {...props} type="info" />);
    expect(wrapper.find('.icofont-info-circle')).toHaveLength(1);
  });

  test('Renders success icon', () => {
    const wrapper = mount(<Alert {...props} />);
    expect(wrapper.find('.icofont-thumbs-up')).toHaveLength(1);
  });
});
