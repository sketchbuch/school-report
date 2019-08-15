// @flow

import * as React from 'react';
import { shallow } from 'enzyme';
import Form from './Form';
import defaultFormProps from '../../../types/forms';
import formTests from '../../formTests';
import type { Props } from './Form';

describe('PupilsLayout <Form />', () => {
  const values = { firstname: '', lastname: '', description: '' };
  const fieldErrors = values;
  const props: Props = {
    ...defaultFormProps(jest),
    classId: 'id-1',
    isSubmitting: false,
    values,
  };

  const renderer = (additionalProps: Object = {}): React.Element<*> => {
    return <Form {...props} {...additionalProps} />;
  };

  formTests(renderer, Object.keys(values), Object.keys(fieldErrors));

  describe('Render:', () => {
    const wrapper = shallow(renderer());

    test('Renders 5 FieldWraps', () => {
      expect(wrapper.find('FieldWrap')).toHaveLength(5);
    });

    test('Renders 3 TextInputs', () => {
      expect(wrapper.find('TextInput')).toHaveLength(3);
    });

    test('Renders a GenderSwitch', () => {
      expect(wrapper.find('GenderSwitch')).toHaveLength(1);
    });
  });
});
