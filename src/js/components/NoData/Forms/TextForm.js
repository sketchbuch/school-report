// @flow

import React, { Component } from 'react';
import { Button, Textarea } from '../../Ui';
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
      <form className="NoData__step--text" onSubmit={handleSubmit}>
        <p className="NoData__msg">
          <Translation name="TextMessage" ns="NoData" />
        </p>
        <div className="fieldwrap">
          <Textarea
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.text.bodytext}
            name="text.bodytext"
            placeholder={text('BodytextPlaceholder', 'Texts')}
            isValid={btValid}
          />
          {!btValid && <p className="invalid-feedback">{errors.text.bodytext}</p>}
        </div>
        <div className="fieldwrap">
          <Button type="submit" disabled={busy || btnIsDisabled || isSubmitting} busy={busy}>
            <Translation name="TextBtnLabel" ns="NoData" />
          </Button>
        </div>
      </form>
    );
  }
}

export default TextForm;
