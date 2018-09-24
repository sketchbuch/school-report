// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ExportBuilderForm from './ExportBuilderForm';
import '../../../components/Translation/testData';

configure({ adapter: new Adapter() });

describe('<ExportBuilderForm />', () => {
  const props = {
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
