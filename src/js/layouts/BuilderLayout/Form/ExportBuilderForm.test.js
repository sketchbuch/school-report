// @flow

import React from 'react';
import { shallow } from 'enzyme';
import ExportBuilderForm from './ExportBuilderForm';
import type { Props } from './ExportBuilderForm';

describe('<ExportBuilderForm />', () => {
  const props: Props = {
    dirty: false,
    errors: {},
    export: {},
    handleBlur: jest.fn(),
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    isSubmitting: false,
    reportName: 'Report 1',
    saving: false,
    touched: {},
    values: { name: 'test' },
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<ExportBuilderForm {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
