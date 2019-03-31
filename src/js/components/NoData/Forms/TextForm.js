// @flow

import React, { Component } from 'react';
import { Button, FieldError, FieldWrap, Form, FormHeader, Textarea } from '../../Ui';
import Translation, { text } from '../../Translation/Translation';
import validate from '../../../validation/validation';

// TODO - fix types
type Props = {
  busy: boolean,
  errors: Object,
  handleBlur: Function,
  handleChange: Function,
  handleSubmit: Function,
  isSubmitting: boolean,
  touched: Object,
  values: Object,
};

export class TextForm extends Component<Props> {
  props: Props;

  render() {
    const { busy, errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values } = this.props;
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
          <Button type="submit" disabled={busy || btnIsDisabled || isSubmitting} busy={busy}>
            <Translation name="TextBtnLabel" ns="NoData" />
          </Button>
        </FieldWrap>
      </Form>
    );
  }
}

export default TextForm;
