// @flow

import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import EditCategoryForm from './EditCategoryForm';
import { text } from '../../../components/Translation/Translation';
import '../../../components/Translation/testData';

configure({ adapter: new Adapter() });

describe('<EditCategoryForm />', () => {
  const props = {
    dirty: false,
    errors: {},
    export: {},
    handleBlur: jest.fn(),
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
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
    const wrapperNew = mount(<MemoryRouter><EditCategoryForm {...props} isNew={true} /></MemoryRouter>);
    const wrapper = mount(<MemoryRouter><EditCategoryForm {...props} /></MemoryRouter>);
    const btnTxtNew = wrapperNew.find('button[type="submit"]').text();
    const btnTxt = wrapper.find('button[type="submit"]').text();
    
    expect(btnTxtNew).toEqual(text('CreateCategoryBtnLabel', 'Categories'));
    expect(btnTxtNew).not.toEqual(text('UpdateCategoryBtnLabel', 'Categories'));

    expect(btnTxt).not.toEqual(text('CreateCategoryBtnLabel', 'Categories'));
    expect(btnTxt).toEqual(text('UpdateCategoryBtnLabel', 'Categories'));
  });
});
