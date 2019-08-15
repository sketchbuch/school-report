// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import Form from './Form';
import defaultFormProps from '../../../types/forms';
import formTests from '../../formTests';
import type { Props } from './Form';

describe('CategoriesLayout <Form />', () => {
  const values = { label: '' };
  const fieldErrors = values;
  const props: Props = {
    ...defaultFormProps(jest),
    values,
  };

  const renderer = (additionalProps: Object = {}): React.Element<*> => {
    return <Form {...props} {...additionalProps} />;
  };

  formTests(renderer, Object.keys(values), Object.keys(fieldErrors));

  describe('Render:', () => {
    const wrapper = shallow(renderer());

    test('Renders 2 FieldWraps', () => {
      expect(wrapper.find('FieldWrap')).toHaveLength(2);
    });

    test('Renders a TextInput', () => {
      expect(wrapper.find('TextInput')).toHaveLength(1);
    });
  });
});
