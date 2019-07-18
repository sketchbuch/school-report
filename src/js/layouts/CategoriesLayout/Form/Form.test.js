// @flow

import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Form from './Form';
import type { Props } from './Form';
import { text } from '../../../components/Translation/Translation';

describe('<Form />', () => {
  const props: Props = {
    dirty: false,
    errors: {},
    export: {},
    handleBlur: jest.fn(),
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    isNew: false,
    isSubmitting: false,
    saving: false,
    touched: {},
    values: { label: 'test' },
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<Form {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Handles isNew prop correctly', () => {
    const wrapperNew = mount(
      <MemoryRouter>
        <Form {...props} isNew={true} />
      </MemoryRouter>
    );
    const wrapper = mount(
      <MemoryRouter>
        <Form {...props} />
      </MemoryRouter>
    );
    const btnTxtNew = wrapperNew.find('button[type="submit"]').text();
    const btnTxt = wrapper.find('button[type="submit"]').text();

    expect(btnTxtNew).toEqual(text('CreateCategoryBtnLabel', 'Categories'));
    expect(btnTxtNew).not.toEqual(text('UpdateCategoryBtnLabel', 'Categories'));

    expect(btnTxt).not.toEqual(text('CreateCategoryBtnLabel', 'Categories'));
    expect(btnTxt).toEqual(text('UpdateCategoryBtnLabel', 'Categories'));
  });
});
