// @flow

import React from 'react';
import { shallow } from 'enzyme';
import FieldError from './FieldError';
import type { Props } from './FieldError';

describe('<FieldError />', () => {
  const props: Props = {
    errors: [],
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<FieldError {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Renders null if errors is empty', () => {
    const wrapper = shallow(<FieldError {...props} />);
    expect(wrapper.type()).toBeNull();
  });

  test('Renders errors correctly', () => {
    const errors = ['Error 1', 'Error 2'];
    const wrapper = shallow(<FieldError {...props} errors={errors} />);
    expect(wrapper.type()).not.toBeNull();
    expect(wrapper.find('.FieldError__error')).toHaveLength(errors.length);
  });
});
