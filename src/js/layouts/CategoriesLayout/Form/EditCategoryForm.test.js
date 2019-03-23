// @flow

import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import EditCategoryForm from './EditCategoryForm';
import type { Props } from './EditCategoryForm';
import { text } from '../../../components/Translation/Translation';

describe('<EditCategoryForm />', () => {
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
    const wrapper = shallow(<EditCategoryForm {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Handles isNew prop correctly', () => {
    const wrapperNew = mount(
      <MemoryRouter>
        <EditCategoryForm {...props} isNew={true} />
      </MemoryRouter>
    );
    const wrapper = mount(
      <MemoryRouter>
        <EditCategoryForm {...props} />
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
