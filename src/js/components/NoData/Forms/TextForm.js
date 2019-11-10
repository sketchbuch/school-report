// @flow

import React, { Component } from 'react';
import Translation, { text } from '../../Translation/Translation';
import type { FormikErrors, FormikTouched } from 'formik';
import type { ValuesObject } from '../NoData';
import validate from '../../../validation/validation';
import { Button, FieldError, FieldWrap, Form, FormHeader, Textarea } from '../../Ui';

// TODO - fix types
type Props = {
  busy: boolean,
  errors: ValuesObject,
  handleBlur: Function,
  handleChange: Function,
  handleSubmit: Function,
  isSubmitting: boolean,
  touched: FormikErrors<ValuesObject>,
  values: FormikTouched<ValuesObject>,
};

export class TextForm extends Component<Props> {
  props: Props;

  render() {
    const { busy, errors, handleBlur, handleChange, handleSubmit, touched, values } = this.props;
    const btValid: boolean = validate('bodytext', errors.text, touched.text);
    const btnIsDisabled: boolean = !btValid || values.text.bodytext === '' ? true : false;

    return (
      <Form classes="NoData__step--text" onSubmit={handleSubmit}>
        <FormHeader text={text('TextMessage', 'NoData')} />
        <FieldWrap>
          <Textarea
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.text.bodytext}
            name="text.bodytext"
            placeholder={text('BodytextPlaceholder', 'Texts')}
            isValid={btValid}
          />
          {!btValid && <FieldError errors={[errors.text.bodytext]} />}
        </FieldWrap>
        <FieldWrap>
          <Button type="submit" disabled={busy || btnIsDisabled} busy={busy}>
            <Translation name="TextBtnLabel" ns="NoData" />
          </Button>
        </FieldWrap>
      </Form>
    );
  }
}

export default TextForm;
