//@flow

import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';
import type { PbButtonProps } from './Button';

describe('Button():', () => {
  const props: PbButtonProps = {
    disabled: false,
    label: '1',
    onClick: jest.fn(),
    page: false,
    selected: false,
    title: '1',
    type: '1',
  };

  test('Renders a Button FC', () => {
    const wrapper = shallow(<Button {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  describe('page property:', () => {
    test('Renders without page class if "false"', () => {
      const wrapper = shallow(<Button {...props} />);
      expect(wrapper.find('.PageBrowser__btn--page')).toHaveLength(0);
    });

    test('Renders with page class if "true"', () => {
      const wrapper = shallow(<Button {...props} page />);
      expect(wrapper.find('.PageBrowser__btn--page')).toHaveLength(1);
    });
  });

  describe('selected property:', () => {
    test('Renders without selected class if "false"', () => {
      const wrapper = shallow(<Button {...props} />);
      expect(wrapper.find('.PageBrowser__btn--selected')).toHaveLength(0);
    });

    test('Renders with page selected if "true"', () => {
      const wrapper = shallow(<Button {...props} selected />);
      expect(wrapper.find('.PageBrowser__btn--selected')).toHaveLength(1);
    });
  });
});
