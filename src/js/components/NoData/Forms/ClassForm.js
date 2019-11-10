// @flow

import React, { Component } from 'react';
import Translation, { text } from '../../Translation/Translation';
import type { FormikErrors, FormikTouched } from 'formik';
import type { ValuesObject } from '../NoData';
import validate from '../../../validation/validation';
import { Button, FieldError, FieldWrap, Form, FormHeader, TextInput } from '../../Ui';

// TODO - fix types
type Props = {
  errors: ValuesObject,
  handleBlur: Function,
  handleChange: Function,
  handleSubmit: Function,
  isSubmitting: boolean,
  touched: FormikErrors<ValuesObject>,
  values: FormikTouched<ValuesObject>,
};

export class ClassForm extends Component<Props> {
  props: Props;

  render() {
    const { errors, handleBlur, handleChange, handleSubmit, touched, values } = this.props;
    const clValid: boolean = validate('label', errors.class, touched.class);
    const btnIsDisabled: boolean = !clValid || values.class.label === '' ? true : false;

    return (
      <Form classes="NoData__step--class" onSubmit={handleSubmit}>
        <FormHeader text={text('ClassMessage', 'NoData')} />
        <FieldWrap>
          <TextInput
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.class.label}
            name="class.label"
            placeholder={text('LabelPlaceholder', 'Classes')}
            isValid={clValid}
          />
          {!clValid && <FieldError errors={[errors.class.label]} />}
        </FieldWrap>
        <FieldWrap>
          <Button type="submit" disabled={btnIsDisabled}>
            <Translation name="CreateClassBtnLabel" ns="Classes" />
          </Button>
        </FieldWrap>
        <p className="NoData__msginfo">
          <Translation name="ClassMessageInfo" ns="NoData" />
        </p>
      </Form>
    );
  }
}

export default ClassForm;
