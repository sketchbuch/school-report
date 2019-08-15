// @flow

import React, { Component } from 'react';
import Translation, { text } from '../../../components/Translation/Translation';
import type { FormProps } from '../../../types/forms';
import validate from '../../../validation/validation';
import { Button, FieldError, FieldWrap, Form as FormComp, FormCancel, TextInput } from '../../../components/Ui';
import { ROUTE_CLASSES } from '../../../constants/routes';

export type Props = FormProps;

export class Form extends Component<Props> {
  static defaultProps = {
    dirty: false,
    isNew: false,
  };

  props: Props;

  render() {
    const { dirty, errors, handleBlur, handleChange, handleSubmit, isNew, saving, touched, values } = this.props;
    const clValid: boolean = validate('label', errors, touched);
    const btnIsDisabled: boolean = !clValid || saving || !dirty;

    return (
      <FormComp onSubmit={handleSubmit}>
        <FieldWrap>
          <TextInput
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.label}
            name="label"
            placeholder={text('LabelPlaceholder', 'Classes')}
            isValid={clValid}
          />
          {!clValid && <FieldError errors={[errors.label]} />}
        </FieldWrap>
        <FieldWrap>
          <Button type="submit" disabled={btnIsDisabled} busy={saving}>
            {isNew ? (
              <Translation name="CreateClassBtnLabel" ns="Classes" />
            ) : (
              <Translation name="UpdateClassBtnLabel" ns="Classes" />
            )}
          </Button>
        </FieldWrap>

        {!saving && <FormCancel name="BackToClasses" ns="Classes" to={ROUTE_CLASSES} />}
      </FormComp>
    );
  }
}

export default Form;
